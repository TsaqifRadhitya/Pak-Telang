<?php

namespace Database\Seeders;

use App\Models\User as ModelsUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Seeder;

class User extends Seeder
{
    /**
     * Run the database seeds.
     */
    use HasUlids;
    public function run(): void
    {
        ModelsUser::create(['name' => 'Admin','role' => 'Pak Telang','email' => 'paktelang@gmail.com','password' => 'admin123']);
        // ModelsUser::factory(10)->create();
    }
}
