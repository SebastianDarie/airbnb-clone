import dynamic from 'next/dynamic';

export const dynamicSvgs = {
  Airconditioning: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.AirConditioningSvg)
  ),
  Carbondioxidealarm: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.CarbonSvg)
  ),
  Freestreetparking: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.CarSvg)
  ),
  Kitchen: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.KitchenSvg)
  ),
  Microwave: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.MicrowaveSvg)
  ),
  Refrigerator: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.RefrigeratorSvg)
  ),
  Smokealarm: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.SmokeSvg)
  ),
  TV: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.TVSvg)
  ),
  Washer: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.WasherSvg)
  ),
  Wifi: dynamic<{}>(() =>
    import('@second-gear/controller').then((mod) => mod.WifiSvg)
  ),
};
