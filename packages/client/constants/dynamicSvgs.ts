import dynamic from 'next/dynamic';

export const dynamicSvgs = {
  Airconditioning: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.AirConditioningSvg)
  ),
  Carbondioxidealarm: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.CarbonSvg)
  ),
  //Dryer: dynamic<{}>(() => import('@airbnb-clone/controller').then(mod => mod.DryerSvg)),
  Freestreetparking: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.CarSvg)
  ),
  Kitchen: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.KitchenSvg)
  ),
  Microwave: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.MicrowaveSvg)
  ),
  Refrigerator: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.RefrigeratorSvg)
  ),
  Smokealarm: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.SmokeSvg)
  ),
  TV: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.TVSvg)
  ),
  Washer: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.WasherSvg)
  ),
  Wifi: dynamic<{}>(() =>
    import('@airbnb-clone/controller').then((mod) => mod.WifiSvg)
  ),
};
