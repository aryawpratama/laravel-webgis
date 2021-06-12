<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <link rel="stylesheet" href="{{ url('../css/style.css') }}">
  <link rel="stylesheet" href="{{ url('../css/app.css') }}">
  <title>Google Maps Project</title>
</head>
<body class="flex flex-col relative">
  <div class="container w-full h-full flex flex-col bg-green-300">
    <div class=" px-4 py-6 w-full h-full relative flex items-center bg-red-300 text-white">
      <h1 class="text-2xl">UNDER DEVELOPMENT</h1>
    </div>
    <div class="w-full h-96 bg-blue-100 flex flex-col justify-center items-center">
    <div class="h-72 w-3/4" id="maps">
      </div>
      <div style="display: none;">
        <div id="marker" title="Marker" style="width: 20px;
        height: 20px;
        border: 1px solid #088;
        border-radius: 10px;
        background-color: #0FF;
        opacity: 0.5;"></div>
      </div>
    </div>
    <div class="w-full h-auto relative flex flex-row justify-center items-center bg-gray-50">
        <div class="min-h-auto flex items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
          <div class="max-w-md w-full space-y-8">
            <form class="mt-8 space-y-6" action="/maps" method="post">
              @csrf
              <div class="rounded-md shadow-sm -space-y-px">
                <div>
                  <label for="provinsi" class="sr-only">Provinsi</label>
                  <input id="provinsi" name="provinsi" type="text" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Provinsi">
                </div>
                <div>
                  <label for="kotaorkab" class="sr-only">Kota/Kab</label>
                  <input id="kotaorkab" name="kotaorkab" type="text" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Kota/Kab">
                </div>
                <div>
                  <label for="latitude" class="sr-only">Latitude</label>
                  <input id="latitude" name="latitude" type="text" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Latitude">
                </div>
                <div>
                  <label for="longitude" class="sr-only">Longtitude</label>
                  <input id="longitude" name="longitude" type="text" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Longitude">
                </div>
              </div>
              <div>
                <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Tambah Data
                </button>
              </div>
            </form>
          </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
    <script src="{{ url('../js/js.js') }}"></script>
</body>

</html>
    <script src="{{ url('../js/js.js') }}"></script>
</body>

</html>
