import $ from 'jquery'

var call = () => { url:, data:{<data>}, headers:{ token:<token> }}


$.ajax(
	{url:'http://www.ncdc.noaa.gov/cdo-web/api/v2/locations',
	data:{locationcategoryid: 'CITY'},
	headers:{ token:'xMyxWDfOEQGzuVPXnVHEoyCdoQcEvcfZ' } 
	}
	)	