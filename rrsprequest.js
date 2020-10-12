const t = "a6804100da9d72bfa4356e2609913281"

if ($request.method === 'GET') {
    const i = $request.headers['st'];
    var headers = JSON.parse(
  JSON.stringify($request.headers).replace(i,t)
);
  const data = { headers };
$done(data);
};
