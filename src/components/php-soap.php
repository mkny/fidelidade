<?php
@header('Access-Control-Allow-Origin: *');

extract($_GET, EXTR_PREFIX_ALL, 'soap');

$soap_url = isset($soap_url) ? $soap_url:null;
$soap_method = isset($soap_method) ? $soap_method:null;
$soap_params = isset($soap_params) ? $soap_params:null;

function dd($data, $debug=false){
	echo '<pre>';$debug?var_dump($data):print_r($data);exit;
}

function daniloXml($xml){
	return trim(str_replace('<?xml version="1.0"?>', '', $xml));
}

function toJson($data){
	return json_encode(simplexml_load_string($data));
}

function arrayToXml($array, &$xml, $newName=null){
	foreach ($array as $key => $value) {
		if(is_array($value)){
			if(count($value)){
				if(is_numeric(array_keys($value)[0])){
					foreach ($value as $val_data) {
						$xml->addChild($key, $val_data);
					}
				} else {
					$label = $xml->addChild($key);
					arrayToXml($value, $label, $key);
				}
			} else {
				$xml->addChild($key);
			}
		} else {
			$xml->addChild((is_numeric($key)) ? $newName:$key, $value);
		}
	}
}

function doSoap($url, $method, $params=null){
	$client = new SoapClient($url, array(
		'soap_version'=>SOAP_1_1,
		'exceptions'=>true,
		'trace'=>1,
		'cache_wsdl' => WSDL_CACHE_NONE,
	));

	return $client->__call($method, $params);
}

if(isset($soap_params['xmlParametros'])){
	$xml = new SimpleXMLElement('<Parametros xmlns="http://www.rezendesistemas.com.br" />');
	$d = json_decode($soap_params['xmlParametros'], true);
	arrayToXml($d, $xml);
	$soap_params['xmlParametros'] = daniloXml($xml->asXML());
}

try {
	$soapReturn = doSoap($soap_url, $soap_method, $soap_params);
	echo toJson($soapReturn);
} catch(Exception $e){
	echo json_encode([
		'Sucesso' => 'false',
		'Exception' => $e->getMessage()
		]);
}


