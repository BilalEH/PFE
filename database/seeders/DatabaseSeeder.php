<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(5)->create();

        \App\Models\User::factory()->create([
            'firstName' => "Bilal",
            'lastName' => "EL-Haoudar",
            'role' => 'admin',
            'avatar' => "https://ui-avatars.com/api/?uppercase=false&name=Bilal+EL-Haoudar&background=FFD700&color=122620",
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password,
        ]);
    }
}
