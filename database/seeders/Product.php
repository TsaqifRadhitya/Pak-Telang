<?php

namespace Database\Seeders;

use App\Models\Product as ModelsProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Pest\Laravel\json;

class Product extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            ModelsProduct::create([
                'productName' => 'Teh Telang',
                'productPhoto' => json_encode([
                    'https://res.cloudinary.com/dk0z4ums3/image/upload/v1719881088/attached_image/teh-telang-inilah-7-manfaatnya-untuk-kesehatan-tubuh-0-alodokter.jpg',
                    'https://res.cloudinary.com/dk0z4ums3/image/upload/v1719881088/attached_image/teh-telang-inilah-7-manfaatnya-untuk-kesehatan-tubuh-0-alodokter.jpg'
                ]),
                'productPrice' => 2500,
                'productType' => 'siap pakai',
                'productDescription' => fake()->paragraph()
            ]);
        }
    }
}
