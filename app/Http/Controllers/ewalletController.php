<?php

namespace App\Http\Controllers;

use App\Models\Mutasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ewalletController extends Controller
{
    public function index(){
        $User  = Auth::user();
        $mutations = Mutasi::where('userId',$User->id)->get();
        if($User->role === "Pak Telang"){

        }else {
            return Inertia::render('Mitra/Ewallet/index',compact('mutations'));
        }
    }

    public function store(){

    }

    public function update($id){

    }
}
