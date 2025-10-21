<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EsemenyFactory extends Factory
{
    public function definition(): array
    {
        $kezdes = fake()->dateTimeBetween('+1 week', '+3 months');
        $befejezes = (clone $kezdes)->modify('+3 hours');

        return [
            'cim' => fake()->sentence(4),
            'leiras' => fake()->paragraph(3),
            'helyszin' => fake()->city(),
            'kezdes' => $kezdes,
            'befejezes' => $befejezes,
            'max_ferohely' => fake()->numberBetween(50, 200),
        ];
    }
}
