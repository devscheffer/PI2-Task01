<?php

namespace FastRoute;

interface dataGenerator
{
    /**
     * Adds a route to the data generator. The route data uses the
     * same format that is returned by RouterParser::parser().
     *
     * The handler doesn't necessarily need to be a callable, it
     * can be arbitrary data that will be returned when the route
     * matches.
     *
     * @param string $httpMethod
     * @param array $routedata
     * @param mixed $handler
     */
    public function addRoute($httpMethod, $routedata, $handler);

    /**
     * Returns dispatcher data in some unspecified format, which
     * depends on the used method of dispatch.
     */
    public function getdata();
}
