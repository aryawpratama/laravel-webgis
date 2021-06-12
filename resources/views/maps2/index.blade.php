<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="{{ url('../css/app.css') }}">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
  <title>Project</title>
</head>

<body>
  {{-- Header --}}
  <div
    class="top-0 left-0 right-0 border relative h-16 px-4 py-6 bg-gray-300 flex flex-col text-gray-600 justify-center items-center">
    <h1>Under Development by Gani</h1>
  </div>
  <div class="w-full h-96 relative flex bg-gray-400" id="maps"></div>
  <div class=" bg-gray-300 w-full h-auto relative flex justify-center items-center">
    <div class="min-h-auto flex items-center bg-gray-300 py-2 px-4 sm:px-6 lg:px-8 rounded-xl">
      <div class="max-w-md w-full space-y-8">
          <div>
            <a href="maps/create">
            <button
              class=" mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800">
              Tambah Data
            </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="py-6 bg-gray-300">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Label
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kabupaten/Kota
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provinsi
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Latitude
                    </th>
                    <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Longitude
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  @foreach ($maps as $m)
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">
                          Point {{ $m->id }}
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
                        <a href="maps/{{ $m->id }}/edit"
                          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800">
                          Edit Data
                        </a>
                        <form action="maps/{{$m->id}}"
                          method="post">
                          @method('delete')
                          @csrf
                          <button type="submit"
                            class="mt-2 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800">
                            Hapus Data
                          </button>
                        </form>
                      </td>
                    </tr>
                    <input type="hidden"
                      value="{{$m->id}}"
                      id="lab{{$loop->index}}">
                    <input type="hidden"
                      value="{{$m->kotaorkab}}"
                      id="kab{{$loop->index}}">
                    <input type="hidden"
                      value="{{$m->provinsi}}"
                      id="prov{{$loop->index}}">
                    <input type="hidden"
                      value="{{$m->latitude}}"
                      id="lat{{$loop->index}}">
                    <input type="hidden"
                      value="{{$m->longitude}}"
                      id="lon{{$loop->index}}">
                    <!-- More rows... -->
                    
                  @endforeach
                  @foreach ($maps as $m)
                    @php
                    $a = '';
                    $a = $loop->index;
                    @endphp
                  @endforeach
                  <input type="hidden" value="{{ $a ?? ''}}" id="index">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="{{url("../js2/view.js")}}"></script>
</body>
</html>
