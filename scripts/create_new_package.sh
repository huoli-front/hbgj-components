#!/usr/bin/env bash
packageName=$1

echo $packageName

lerna list
lerna create $packageName  --es-module --access=public
