## 1. Felhasználói Műveletek

### 1.1. Új felhasználó regisztrálása

A parancs egy már létező email címmel próbál regisztrálni, bizonyítva, hogy az `unique` email validációs szabály működik.

**Parancs:**
```bash
curl -X POST http://localhost/api/regisztracio \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "nev": "Kovács János",
    "email": "kovacs.janos@pelda.hu",
    "jelszo": "Jelszo1234",
    "jelszo_confirmation": "Jelszo1234"
}'
```
**Válasz (Sikeres validációs hiba):**
```json
{
    "message": "The email has already been taken.",
    "errors": {
        "email": [
            "The email has already been taken."
        ]
    }
}
```

### 1.2. Bejelentkezés (`user@teszt.hu`)

**Parancs:**
```bash
TOKEN=$(curl -s -X POST http://localhost/api/bejelentkezes \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{"email": "user@teszt.hu", "jelszo": "user123"}' | jq -r .token)
```
**Eredmény:** A parancs sikeresen lefut, a kapott API token a `TOKEN` környezeti változóba kerül elmentésre a további parancsokhoz.

### 1.3. Profiladatok ellenőrzése (Védett végpont teszt)

**Parancs:**
```bash
curl -X GET http://localhost/api/profil \
-H "Authorization: Bearer $TOKEN" \
-H "Accept: application/json" | jq
```
**Válasz (Sikeres authentikáció):**
```json
{
  "id": 2,
  "nev": "Teszt Felhasználó",
  "email": "user@teszt.hu",
  "email_verified_at": null,
  "szerepkor": "felhasznalo",
  "created_at": "2025-10-21T10:09:51.000000Z",
  "updated_at": "2025-10-21T10:09:51.000000Z"
}
```

### 1.4. Foglalási Ciklus (Létrehozás, Listázás, Törlés)

#### 1. Foglalás létrehozása (1-es eseményre, 2 hellyel)
**Parancs:**
```bash
curl -X POST http://localhost/api/esemenyek/1/foglalas \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{"helyek_szama": 2}' | jq
```
**Válasz (Sikeres foglalás, ID: 2):**
```json
{
  "data": {
    "foglalas_id": 2,
    "lefoglalt_helyek": 2,
    "foglalas_datuma": "2025-10-21 10:26"
  }
}
```

#### 2. Saját foglalások listázása (foglalás után)
**Parancs:**
```bash
curl -X GET http://localhost/api/sajat-foglalasok \
-H "Authorization: Bearer $TOKEN" \
-H "Accept: application/json" | jq
```
**Válasz (A lista tartalmazza a foglalást, elérhető helyek 199-ről 197-re csökkentek):**
```json
{
  "data": [
    {
      "foglalas_id": 2,
      "lefoglalt_helyek": 2,
      "foglalas_datuma": "2025-10-21 10:26",
      "esemeny": {
        "id": 1,
        "cim": "Ab repellendus commodi facilis maiores quas.",
        "leiras": "Suscipit officia odio cum nobis tempora ducimus est. Quibusdam tempore quis occaecati qui itaque. Facere qui beatae laborum sed aliquid quibusdam tempore. Nisi repellat quasi ipsum facere. Qui quia autem illum tenetur recusandae.",
        "helyszin": "Lake Emmitttown",
        "kezdes": "2025. December 19., 06:43",
        "befejezes": "2025. December 19., 09:43",
        "max_ferohely": 199,
        "elerheto_helyek": 197
      }
    }
  ]
}
```

#### 3. Foglalás törlése (ID: 2)
**Parancs:**
```bash
curl -X DELETE http://localhost/api/foglalasok/2 \
-H "Authorization: Bearer $TOKEN" \
-H "Accept: application/json"
```
**Válasz:** Üres válasz (HTTP 204 No Content).

#### 4. Törlés ellenőrzése
**Parancs:**
```bash
curl -X GET http://localhost/api/sajat-foglalasok \
-H "Authorization: Bearer $TOKEN" \
-H "Accept: application/json" | jq
```
**Válasz (A lista most már üres):**
```json
{
  "data": []
}
```

---

## 2. Adminisztrátori Műveletek

### 2.1. Admin bejelentkezés

**Parancs:**
```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost/api/bejelentkezes \
-H "Content-Type: application/json" -d '{"email": "admin@teszt.hu", "jelszo": "admin123"}' | jq -r .token)
```
**Eredmény:** Az `ADMIN_TOKEN` változó beállítva a kapott adminisztrátori API tokenre.

### 2.2. Esemény CRUD (Létrehozás, Módosítás, Törlés)

#### 1. Új esemény létrehozása
**Parancs:**
```bash
curl -X POST http://localhost/api/admin/esemenyek \
-H "Authorization: Bearer $ADMIN_TOKEN" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "cim": "Arch Linux Találkozó 2026",
    "leiras": "Ismerkedés, előadások és workshopok.",
    "helyszin": "Budapest",
    "kezdes": "2026-09-20 10:00:00",
    "befejezes": "2026-09-20 18:00:00",
    "max_ferohely": 100
}' | jq
```
**Válasz (Sikeres létrehozás, ID: 16):**
```json
{
  "data": {
    "id": 16,
    "cim": "Arch Linux Találkozó 2026",
    "leiras": "Ismerkedés, előadások és workshopok.",
    "helyszin": "Budapest",
    "kezdes": "2026. September 20., 10:00",
    "befejezes": "2026. September 20., 18:00",
    "max_ferohely": 100,
    "elerheto_helyek": 100
  }
}
```

#### 2. Esemény módosítása (ID: 16)
**Parancs:**
```bash
curl -X PUT http://localhost/api/admin/esemenyek/16 \
-H "Authorization: Bearer $ADMIN_TOKEN" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
    "cim": "Arch Linux Találkozó 2026 (Módosítva)",
    "leiras": "Ismerkedés, előadások és workshopok.",
    "helyszin": "Debrecen",
    "kezdes": "2026-09-21 10:00:00",
    "befejezes": "2026-09-21 18:00:00",
    "max_ferohely": 150
}' | jq
```
**Válasz (Sikeres módosítás):**
```json
{
  "data": {
    "id": 16,
    "cim": "Arch Linux Találkozó 2026 (Módosítva)",
    "leiras": "Ismerkedés, előadások és workshopok.",
    "helyszin": "Debrecen",
    "kezdes": "2026. September 21., 10:00",
    "befejezes": "2026. September 21., 18:00",
    "max_ferohely": 150,
    "elerheto_helyek": 150
  }
}
```

#### 3. Esemény törlése (ID: 16)
**Parancs:**
```bash
curl -X DELETE http://localhost/api/admin/esemenyek/16 \
-H "Authorization: Bearer $ADMIN_TOKEN" \
-H "Accept: application/json"
```
**Válasz:** Üres válasz (HTTP 204 No Content).

### 2.3. Riport lekérése

**Parancs:**
```bash
curl -X GET http://localhost/api/admin/esemenyek/1/resztvevok \
-H "Authorization: Bearer $ADMIN_TOKEN" \
-H "Accept: application/json" | jq
```
**Válasz (Helyesen üres lista, mivel az 1-es eseményen nincs foglalás):**
```json
[]
```
