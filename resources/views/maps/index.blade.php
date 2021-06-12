<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" href="{{ url('../css/style.css') }}">
    <link rel="stylesheet" href="{{ url('../css/app.css') }}">
    <title>Google Maps Project</title>
</head>
<body class="flex flex-col relative">
    <div class="container w-full h-screen flex flex-col bg-gray-200">
        <div class=" px-4 py-6 w-full h-48 relative flex flex-col items-center justify-center bg-gray-200 text-gray-800">
            <h1 class="text-2xl">UNDER DEVELOPMENT</h1>
            <a class="text-2xl ml-10" href="/maps/create">Tambah Data</a>
        </div>
        <div class="w-full h-96 flex flex-col justify-center items-center">
            <div class="h-72 w-3/4" id="maps">
            </div>
          </div>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <!-- This example requires Tailwind CSS v2.0+ -->
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                @if (session('status'))
                                <div class="alert alert-success">
                                    {{ session('status') }}
                                    </div>
                                @endif
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Label
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kabupaten/Kota
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Provinsi
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Latitude
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Longitude
                                            </th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        @foreach($maps as $m)
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-900">
                                                    label {{ $m->id }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-900">
                                                    {{ $m->kotaorkab }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="text-sm text-gray-900">
                                                    {{ $m->provinsi }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="text-sm text-gray-900">
                                                    {{ $m->latitude }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="text-sm text-gray-900">
                                                    {{ $m->longitude }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <a href="maps/{{ $m->id }}" class="text-indigo-600 hover:text-indigo-900">Detail</a>
                                            </td>
                                        </tr>
                                        <input type="hidden" value="{{ $m->latitude }}"id="lat{{$loop->iteration}}">
                                        <input type="hidden" value="{{ $m->longitude }}"id="lon{{$loop->iteration}}">
                                        <!-- More rows... -->
                                        @endforeach
                                        @foreach ($maps as $m)
                                            @php
                                            $a = '';
                                            $a = $loop->iteration;
                                            @endphp 
                                        @endforeach
                                        <input type="hidden" value="{{ $a ?? '' }}" id="index">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        // console.log(@json($maps));
    </script>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
    <script src="{{ url('../js/jsdetail2.js') }}"></script>
</body>

</html>