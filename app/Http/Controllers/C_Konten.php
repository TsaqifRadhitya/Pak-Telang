<?php

namespace App\Http\Controllers;

use App\Models\konten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class C_Konten extends Controller
{
    public function viewIndex(Request $request)
    {
        $category = $request->category;
        $search = $request->search;

        $query = konten::query()->orderBy('created_at', 'asc');

        if ($category) {
            $query->where('category', '=', $category);
        }

        if ($search) {
            $query->whereRaw('lower(slug) like ?', ["%" . strtolower($search) . "%"]);
        }

        $kontens = $query->simplePaginate(6); // ← Simple pagination here

        // Convert imageContent to JSON if not null
        $kontens->getCollection()->transform(function ($data) {
            if ($data->imageContent !== null) {
                $data->imageContent = json_encode($data->imageContent);
            }
            return $data;
        });

        return Inertia::render('Guest/Konten/V_HalKonten', [
            'kontens' => $kontens,
            'category' => $category,
            'search' => $search,
        ]);
    }

    public function viewShow($id)
    {
        $konten = konten::whereId($id)->first();
        if ($konten === null)
            return abort(404);
        if ($konten->imageContent !== null) {
            $konten->imageContent = json_decode($konten->imageContent);
        }
        return Inertia::render('Guest/Konten/V_HalDetailKonten', compact('konten'));
    }

    public function index()
    {
        $kontens = konten::orderBy('created_at', 'asc')->simplePaginate(6);

        // Decode imageContent untuk setiap item
        $kontens->getCollection()->transform(function ($konten) {
            if ($konten->imageContent !== null) {
                $konten->imageContent = json_decode($konten->imageContent);
            }
            return $konten;
        });

        return Inertia::render('Pak Telang/Konten/V_HalKonten', [
            'kontens' => $kontens
        ]);
    }

    public function show($konten)
    {
        $konten = konten::whereId($konten)->first();
        if ($konten->imageContent) {
            $konten->imageContent = json_decode($konten->imageContent);
        }
        $editAble = true;
        return Inertia::render('Guest/Konten/V_HalDetailKonten', compact('konten', 'editAble'));
    }

    public function store(Request $request)
    {
        if (konten::where('slug', '=', $request->slug)->count()) {
            throw ValidationException::withMessages([
                'slug' => 'Judul konten sudah tersedia'
            ]);
        }
        ;

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
        return Inertia::render('Pak Telang/Konten/V_HalFormUbahKonten', compact('konten'));
    }

    public function destroy($konten)
    {
        konten::destroy($konten);
        return redirect()->route('admin.konten')->with('success', 'Berhasil Menghapus Konten');
    }

    public function create()
    {
        return Inertia::render('Pak Telang/Konten/V_HalFormTambahKonten');
    }
}
