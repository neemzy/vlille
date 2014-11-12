<?php

$baseUrl = 'http://vlille.fr/stations/';
$listUri = 'xml-stations.aspx';
$detailUri = 'xml-station.aspx?borne=';

$id = 0;

if (array_key_exists('id', $_GET)) {
    $id = intval($_GET['id']);
}

$url = $baseUrl.(0 < $id ? $detailUri.$id : $listUri);
die(str_replace(["\r", "\n"], '', file_get_contents($url)));
