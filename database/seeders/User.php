<?php

namespace Database\Seeders;

use App\Models\User as ModelsUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class User extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelsUser::create(['name' => 'Admin','role' => 'Pak Telang','email' => 'paktelang@gmail.com','password' => 'admin123']);
        // ModelsUser::factory(10)->create();
    }
}
