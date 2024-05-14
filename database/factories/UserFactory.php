<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fn = fake()->firstName();
        $ln = fake()->lastName();
        $role = fake()->randomElement(['admin', 'student', 'teacher', 'parent']);
        $style_admin = ['bg' => 'FFD700', 'color' => '122620'];
        $style_student = ['bg' => '04F17A', 'color' => '19647E'];
        $style_teacher = ['bg' => '19647E', 'color' => 'FFFDFD'];
        $style_parent = ['bg' => 'ff4500', 'color' => 'FFFDFD'];
        $selectedStyle = [];
        if ($role == 'admin') {
            $selectedStyle = $style_admin;
        } else if ($role == 'student') {
            $selectedStyle = $style_student;
        } else if ($role == 'teacher') {
            $selectedStyle = $style_teacher;
        } else {
            $selectedStyle = $style_parent;
        };
        $avatar = "https://ui-avatars.com/api/?uppercase=false&name=$fn+$ln&background=$selectedStyle[bg]&color=$selectedStyle[color]";
        return [
            'firstName' => $fn,
            'lastName' => $ln,
            'role' => $role,
            'avatar' => $avatar,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'cin' => 'G' . $this->faker->randomNumber(4),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return $this
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
