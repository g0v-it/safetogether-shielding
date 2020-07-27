# staysafe-shielding
Covid-19 StaySafe shielding project. 
This project implements a POC for [this journey](https://www.powtoon.com/c/f2AjuQcsqg0/1/m).

See Personas & user stories in https://safe-together.github.io/specification/stories/

See the general architecture requirements in https://safe-together.github.io/specification/protocols#shielding-system

The main components of the Shielding System are summarized in following  picture:

<img src="docs/system/Architecture-sovrin.svg" width="100%"/>


- The [h-system](h-system) code realizes the healthcare  system components.
- The [p-system](p-system) code realizes the civic defense system components.

This system includes technologies developed by [LinkedData.Center Mopso product] (https://mopso.eu/) it reuses the Sovrign infrastructure through the DIZME app by Infocert.
