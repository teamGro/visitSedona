import indexMenu from '../handlers/openCloseNavMenu/indexMenu';

const map = new GMaps({
	el: '#map',
	lat:  34.8543734,
	lng: -111.8301581
});

map.addMarker({
	lat: 34.8543734,
	lng: -111.8301581,
	title: 'Sedona AZ'
});

map.setZoom(8);


//34.870978, -111.763020  34.8543734,-111.8301581
