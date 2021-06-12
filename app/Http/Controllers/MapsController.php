<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;

class MapsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $maps = Map::all();
        return view('maps2.index', compact('maps'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $maps = Map::all();
        return view('maps2.create', compact('maps'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'provinsi' => 'required',
            'kotaorkab' => 'required',
            'latitude' => 'required',
            'longitude' => 'required'
        ]);

        Map::create([
            'provinsi' => $request->provinsi,
            'kotaorkab' => $request->kotaorkab,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude
        ]);

        // with untuk flash massage
        // buat nampilin flash massage di view nya tambahkan :
        // @if (session('added'))
        // <div class="alert alert-success">
        //     {{ session('added') }}
        // </div>
        // @endif

        return redirect('/maps')->with('status', 'Data berhasil di tambahkan!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function show(Map $map)
    {
        // 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function edit(Map $map)
    {
        $maps = Map::all();
        return view('maps2.edit', compact('map'), compact('maps'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Map $map)
    {
        $request->validate([
            'provinsi' => 'required',
            'kotaorkab' => 'required',
            'latitude' => 'required',
            'longitude' => 'required'
        ]);

        Map::where('id', $map->id)
            ->update([
                'provinsi' => $request->provinsi,
                'kotaorkab' => $request->kotaorkab,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);
            return redirect('/maps')->with('status', 'Data berhasil di Edit!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Map  $map
     * @return \Illuminate\Http\Response
     */
    public function destroy(Map $map)
    {
        Map::destroy($map->id);
        return redirect('/maps')->with('status', 'Data berhasil di delete!');
    }
}
