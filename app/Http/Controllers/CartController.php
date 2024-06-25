<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(){
        $user = Auth::user();
        if(!$user){
            return to_route('login');
        }
        return Inertia::render('Cart',  []);

    }
   
}
