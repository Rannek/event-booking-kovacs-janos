# Eseménykezelő és Jegyfoglaló Mini Alkalmazás (Laravel API)

Ez egy egyszerűsített Laravel 12 alkalmazás, amely egy REST API-t biztosít események kezelésére és jegyfoglalásra. A fejlesztői környezet Docker-alapú, a Laravel Sail segítségével futtatható.

## Funkcionális követelmények

- **Autentikáció:** Regisztráció, bejelentkezés API tokenekkel (Sanctum).
- **Események:** Publikus eseménylista és részletek, valamint teljeskörű adminisztrátori CRUD műveletek.
- **Foglalások:** Bejelentkezett felhasználók foglalhatnak helyeket, megtekinthetik és törölhetik saját foglalásaikat. A rendszer ellenőrzi a rendelkezésre álló férőhelyeket.
- **Admin riport:** Eseményenkénti résztvevői lista lekérdezhető.

## Technikai megvalósítás

A projekt a következő szoftververziókkal lett fejlesztve és tesztelve a Laravel Sail (Docker) környezetben.

- **Laravel Framework:** `12.34.0`
- **PHP:** `8.4.13`
- **Adatbázis (MySQL):** `8.0.32`
- **Web Szerver:** Laravel Sail alapértelmezett Nginx image.
- **Composer:** `2.8.12`

A környezet futtatásához szükséges host oldali eszközök:
- **Docker:** `28.5.1`
- **Docker Compose:** `v2.40.0`
---

## Telepítés és Indítás (Docker-rel)

Ez a módszer platformfüggetlen (Windows, macOS, Linux) és nem igényel helyileg telepített PHP-t vagy adatbázis-szervert.

### Előfeltételek
- [Docker](https://www.docker.com/products/docker-desktop/) telepítve és futtatva.

### Lépések

1.  **Projekt klónozása:**
    ```bash
    git clone <repository_url> esemenykezelo
    cd esemenykezelo
    ```

2.  **Környezeti fájl létrehozása:**
    ```bash
    cp .env.example .env
    ```

3.  **Docker konténerek indítása:**
    Ez a parancs letölti a szükséges image-eket és elindítja a környezetet a háttérben. Az első indítás több percig is tarthat.
    ```bash
    ./vendor/bin/sail up -d
    ```
    *(Javaslat: Állíts be egy `alias sail='bash vendor/bin/sail'` aliast a `.bashrc` vagy `.zshrc` fájlodban a kényelmesebb használatért.)*

4.  **Alkalmazás kulcs generálása:**
    ```bash
    ./vendor/bin/sail artisan key:generate
    ```

5.  **Adatbázis létrehozása és feltöltése mintaadatokkal:**
    Ez a parancs létrehozza az adatbázis-struktúrát és feltölti a szükséges mintaadatokkal (admin, felhasználó, események).
    ```bash
    ./vendor/bin/sail artisan migrate:fresh --seed
    ```

### Az alkalmazás használata

- Az **API** a `http://localhost/api/` címen érhető el.
- Az **adatbázis** egy külső kliensből (pl. DBeaver, TablePlus) a következő adatokkal érhető el:
  - Host: `127.0.0.1`
  - Port: `3306`
  - Adatbázis: `esemenykezelo`
  - Felhasználó: `sail`
  - Jelszó: `password`

### Minta Felhasználók

A `db:seed` parancs az alábbi felhasználókat hozza létre:

- **Admin:**
  - Email: `admin@teszt.hu`
  - Jelszó: `admin123`
- **Felhasználó:**
  - Email: `user@teszt.hu`
  - Jelszó: `user123`

---

## API Végpontok (Teszteléshez)

- `POST /api/regisztracio`: Új felhasználó regisztrálása.
- `POST /api/bejelentkezes`: Bejelentkezés, API token kérése.
- `GET /api/esemenyek`: Publikus eseménylista.

**Védett végpontok (`Authorization: Bearer <token>` szükséges):**
- `POST /api/kijelentkezes`: Kijelentkezés.
- `GET /api/profil`: Bejelentkezett felhasználó adatai.
- `POST /api/esemenyek/{id}/foglalas`: Foglalás egy eseményre.
- `GET /api/sajat-foglalasok`: Saját foglalások listája.

**Admin végpontok (admin jogosultság szükséges):**
- `POST /api/admin/esemenyek`: Új esemény létrehozása.
- `PUT /api/admin/esemenyek/{id}`: Esemény módosítása.
- `DELETE /api/admin/esemenyek/{id}`: Esemény törlése.
- `GET /api/admin/esemenyek/{id}/resztvevok`: Esemény résztvevőinek listája.
