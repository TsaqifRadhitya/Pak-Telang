<?php

namespace App\Http\Controllers;

use App\Models\konten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class kontenController extends Controller
{
    public function viewIndex(Request $request)
    {
        $category = $request->category;
        $search = $request->search;
        if ($category && $search) {
            $kontens = konten::where('category', '=', $category)->whereRaw('lower(slug) like ?', ["%" . $search . "%"])->orderBy('created_at', 'asc')->get();
        } else if ($category) {
            $kontens = konten::where('category', '=', $category)->orderBy('created_at', 'asc')->get();
        } else if ($search) {
            $kontens = konten::whereRaw('lower(slug) like ?', ["%" . $search . "%"])->orderBy('created_at', 'asc')->get();
        } else {
            $kontens = konten::orderBy('created_at', 'asc')->get();
        }

        $kontens->map(function ($data) {
            if ($data->imageContent !== null) {
                $data->imageContent = json_encode($data->imageContent);
            }
            return $data;
        });
        return Inertia::render('Guest/Konten/Konten', compact('kontens', 'category', 'search'));
    }

    public function viewShow($id)
    {
        $konten =  konten::whereId($id)->first();
        if ($konten === null) return abort(404);
        if ($konten->imageContent !== null) {
            $konten->imageContent = json_decode($konten->imageContent);
        }
        return Inertia::render('Guest/Konten/detailKontent', compact('konten'));
    }

    public function index()
    {
        $kontens = konten::orderBy('created_at', 'asc')->get();
        $kontens->map(function ($konten) {
            if ($konten->imageContent !== null) {
                $konten->imageContent = json_decode($konten->imageContent);
            }
            return $konten;
        });
        return Inertia::render('Pak Telang/Konten/allKonten', compact('kontens'));
    }

    public function show($konten)
    {
        $konten = konten::whereId($konten)->first();
        if($konten->imageContent){
            $konten->imageContent = json_decode($konten->imageContent);
        }
        $editAble = true;
        return Inertia::render('Guest/Konten/detailKontent',compact('konten','editAble'));
    }

    public function store(Request $request)
    {
        if (konten::where('slug', '=', $request->slug)->count()) {
            throw ValidationException::withMessages([
                'slug' => 'Judul konten sudah tersedia'
            ]);
            return back();
        };

        if ($request->video && $request->imageContent) {
            konten::create([
                'author' => Auth::user()->id,
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'slug' => $request->slug,
                'video' => $request->video,
                'imageContent' => json_encode($request->imageContent),
            ]);
        } else if ($request->video) {
            konten::create([
                'author' => Auth::user()->id,
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'slug' => $request->slug,
                'video' => $request->video,
            ]);
        } else if ($request->imageContent) {
            konten::create([
                'author' => Auth::user()->id,
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'slug' => $request->slug,
                'imageContent' => json_encode($request->imageContent),
            ]);
        } else {
            konten::create([
                'author' => Auth::user()->id,
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'slug' => $request->slug,
            ]);
        }
        return redirect(route('admin.konten'))->with('success', 'Konten baru berhasil ditambahkan');
    }

    public function update(Request $request, $konten)
    {
        if ($request->video && $request->imageContent) {
            konten::whereId($konten)->update([
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'slug' => $request->slug,
                'video' => $request->video,
                'imageContent' => json_encode($request->imageContent),
            ]);
        } else if ($request->video) {
            konten::whereId($konten)->update([
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'imageContent' => null,
                'slug' => $request->slug,
                'video' => $request->video,
            ]);
        } else if ($request->imageContent) {
            konten::whereId($konten)->update([
                'content' => $request->content,
                'imageCover' => $request->imageCover,
                'video' => null,
                'category' => $request->category,
                'slug' => $request->slug,
                'imageContent' => json_encode($request->imageContent),
            ]);
        } else {
            konten::whereId($konten)->update([
                'content' => $request->content,
                'video' => null,
                'imageContent' => null,
                'imageCover' => $request->imageCover,
                'category' => $request->category,
                'slug' => $request->slug,
            ]);
        }

        return redirect(route('admin.konten'))->with('success', 'Berhasil memperbarui konten');
    }

    public function edit($konten)
    {
        $konten = konten::whereId($konten)->first();
        if ($konten->imageContent) {
            $konten->imageContent = json_decode($konten->imageContent);
        }
        return Inertia::render('Pak Telang/Konten/EditKonten', compact('konten'));
    }

    public function destroy($konten)
    {
        konten::destroy($konten);
        return back()->with('success', 'Berhasil Menghapus Konten');
    }

    public function create()
    {
        return Inertia::render('Pak Telang/Konten/createKonten');
    }
}
