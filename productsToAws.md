## Product codes

```
// Mos: prod-6a656
// Korvbröd: prod-ed8d6
// Glutenfritt korvbröd: prod-07918
// Pômmes: prod-f7779

// Grillkorv: prod-e6f54
// Chorizo: prod-bdb7a
// Varmkorv: prod-5cafe
// Ostkorv: prod-916aa
// Vegankorv: prod-7b757

// Coca-Cola Original: prod-06683
// Coca cola zero: prod-e5220
// Fanta: prod-59aed
// Fanta exotic: prod-94327
// Loka naturell: prod-dda7d
// Energidryck: prod-c36b0

// Räksallad: prod-ff90f
// Gurkmajonäs: prod-0f2ca
// Rostad lök: prod-5a941
// Skagenröra: prod-85f17
// Bostongurka: prod-91b1f
```

## Allergens in the database

```
allergenes: ["ägg", "skaldjur", "gluten", "mjölkprotein", "laktos" ]

```

## Add each object one by one in Insomnia by the PostMenuItem function

```
{
	"meals": [
		{
			"name": "Kôrv mä mos",
			"category": "MEAL",
			"price": 55,
			"summary": "En kokt kôrv mä mos, inga kônstigheter.",
			"description": "En klassisk kokt kôrv serverad med potatismos. Perfekt som en snabb lunch eller som kvällsmat. Enkel, god och alltid pålitlig.",
			"img": "assets/icons/mojjen-meny-varmkorv-mos.png",
			"items": ["prod-5cafe", "prod-6a656"]
		},
		{
			"name": "Chorizokôrv mä pômmes",
			"category": "MEAL",
			"price": 75,
			"summary": "Kryddig chorizokôrv med krispiga pômmes.",
			"description": "Het chorizokôrv som sätter fart på smaklökarna. Serveras med krispiga pômmes och bostongurka. Lite extra energi för dig som jobbar hårt på bygget.",
			"img": "assets/icons/mojjen-meny-chorizo-pommes.png",
			"items": ["prod-bdb7a", "prod-f7779", "prod-91b1f"]
		},
		{
			"name": "Ostkôrv i brôd",
			"category": "MEAL",
			"price": 70,
			"summary": "Saftig ostkôrv serverad i luftigt kôrvbrôd.",
			"description": "En saftig ostkôrv som smälter i munnen inuti ett luftigt kôrvbrôd. Serveras med rostad lök för extra crunch. Perfekt lunch för den som vill ha nåt mättande och gôtt.",
			"img": "assets/icons/mojjen-meny-ostkorv.png",
			"items": ["prod-916aa", "prod-ed8d6"]
		},
		{
			"name": "Varmkôrv mä räksallad",
			"category": "MEAL",
			"price": 65,
			"summary": "Lättkryddad varmkôrv, toppad med räksallad.",
			"description": "En klassisk varmkôrv toppad med krämig räksallad. Serveras med hemgjort potatismos vid sidan av. Perfekt för dig som vill ha både kôrv och lite extra lyx på lunchen.",
			"img": "assets/icons/mojjen-meny-varmkorv-raksallad.png",
			"items": ["prod-5cafe", "prod-ff90f", "prod-6a656"]
		},
		{
			"name": "Grillkôrv i brôd",
			"category": "MEAL",
			"price": 60,
			"summary": "Grillkôrv serverad i luftigt kôrvbrôd.",
			"description": "Saftig grillkôrv serverad i luftigt kôrvbrôd med bostongurka. Perfekt för dig som vill ha nåt snabbt och gott.",
			"img": "assets/icons/mojjen-meny-grillkorv.png",
			"items": ["prod-e6f54", "prod-ed8d6", "prod-91b1f"]
		},
		{
			"name": "Vegansk kôrv mä pômmes",
			"category": "MEAL",
			"price": 70,
			"summary": "Vegansk kôrv serverad med krispiga pômmes.",
			"description": "Mild växtbaserad kôrv serverad med krispiga pômmes och bostongurka. Perfekt för dig som vill ha ett lättare alternativ.",
			"img": "assets/icons/mojjen-meny-vegansk-pommes.png",
			"items": ["prod-7b757", "prod-f7779", "prod-91b1f"]
		},
		{
			"name": "Lams Inferno",
			"category": "MEAL",
			"price": 65,
			"summary": "Het och smakrik combo som vågar sticka ut.",
			"description": "En kraftfull smakexplosion med kryddig chorizo, krispiga pômmes, syrlig bostongurka och extra crunch från rostad lök. Endast för de modiga.",
			"img": "assets/icons/mojjen-meny-lams-inferno.png",
			"items": [
				"prod-bdb7a",   // Chorizokôrv
				"prod-f7779",   // Pômmes
				"prod-91b1f",   // Bostongurka
				"prod-5a941"    // Rostad lök
			]
		 },
		 {
			"name": "Nikkis metal madness",
			"category": "MEAL",
			"price": 66,
			"summary": "Krisp, ost och metal-explosion.",
			"description": "Två saftiga Ostkôrv-monster med pômmes så krispiga att de nästan låter som trumvirvlar i en moshpit. En smakexplosion som får smaklökarna att headbanga. Kan orsaka spontana luftgitarrsolon.",
			"img": "assets/icons/nikkis-metal-madness.png",
			"items": [
				"prod-916aa",
				"prod-f7779",
				"prod-91b1f",
					"prod-0f2ca"
			]
			},
			{
			"name": "Klaranoss",
			"category": "MEAL",
			"price": 66,
			"summary": "En kabanoss med swag (och picklad rödlök)",
			"description": "Våga vägra vegokorv! En kabanoss i fullkornsbröd med smokey bbq-sås och picklad rödlök skare va. Strunta i pommes, låt din kille beställa det och sno från hans tallrik istället.",
			"img": "assets/icons/mojjen-meny-klaranoss.png",
			"items": [
				"prod-f7779",
				"prod-91b1f",
				"prod-0f2ca"
			]
		},
		{
			"name": "Stefans Big Meal",
			"category": "MEAL",
			"price": 67,
			"summary": "Grillkôrv i bröd med mos och räksallad ovanpå.",
			"description": "En tjock grillkôrv i bröd med ketchup, senap, mos, räksallad och rostad lök. En jättemåltid serverad direkt i handen för den som är extra hungrig och vill ha fri andra hand.",
			"img": "assets/icons/mojjen-meny-stefans-big-meal.png",
			"items": [
				"prod-e6f54",
				"prod-ed8d6",
				"prod-6a656",
				"prod-ff90f",
				"prod-5a941"
			]
			},
			{
			"name": "Poké-kôrv",
			"category": "MEAL",
			"price": "199",
			"summary": "Ett hett val för tränare som inte backar från strid.",
			"description": "Kryddig korv som ger "Burn"-känsla, pommes som boostar din HP, syrlig relish som får dig att vakna till och rostad lök för en episk "Critical Hit". Ett val för tränaren som vågar möta utmaningar.",
			"img": "assets/icons/mojjen-meny-poke-korv.png",
			"items": [
				"prod-6a656",
				"prod-ff90f",
				"prod-5a941"
			]
			}
	],
	"sides": [
		{
			"name": "Mos",
			"category": "SIDE",
			"price": 20,
			"summary": "Krämigt hemgjort mos gjort på potatis, smör och grädde.",
			"img": "src/assets/icons/side.png",
			"allergenes": ["laktos", "mjölkprotein"]
		},
		{
			"name": "Kôrvbrôd",
			"category": "SIDE",
			"price": 10,
			"summary": "Luftigt kôrvbrôd, perfekt till grillad kôrv.",
			"img": "src/assets/icons/side.png",
			"allergenes": ["gluten"]
		},
		{
			"name": "Glutenfritt kôrvbrôd",
			"category": "SIDE",
			"price": 10,
			"summary": "Glutenfritt kôrvbrôd, perfekt till grillad kôrv.",
			"img": "src/assets/icons/side.png",
			"allergenes": ["gluten"]
		},
		{
			"name": "Pômmes",
			"category": "SIDE",
			"price": 25,
			"summary": "Krispiga pômmes frites gjorda på potatis.",
			"img": "src/assets/icons/side.png"
		}
	],
	"proteins": [
		{
			"name": "Grillkôrv",
			"category": "PROTEIN",
			"price": 25,
			"summary": "Klassisk grillkôrv med mild rökig smak.",
			"img": "src/assets/icons/protein.png"
		},
		{
			"name": "Chorizokôrv",
			"category": "PROTEIN",
			"price": 30,
			"summary": "Kryddig chorizokôrv med paprika och vitlök.",
			"img": "src/assets/icons/protein.png"
		},
		{
			"name": "Varmkôrv (wiener)",
			"category": "PROTEIN",
			"price": 20,
			"summary": "Lättkryddad varmkôrv med klassisk smak.",
			"img": "src/assets/icons/protein.png",
			"allergenes": ["mjölkprotein", "laktos"]
		},
		{
			"name": "Ostkôrv",
			"category": "PROTEIN",
			"price": 30,
			"summary": "Saftig kôrv, fylld med smält ost.",
			"img": "src/assets/icons/protein.png",
			"allergenes": ["mjölkprotein", "laktos"]
		},
		{
			"name": "Vegansk kôrv",
			"category": "PROTEIN",
			"price": 30,
			"summary": "Växtbaserad kôrv med mild smak.",
			"img": "src/assets/icons/protein.png"
		}
	],
	"drinks": [
		{
			"name": "Coca-Cola Original Taste 33 cl",
			"category": "DRINK",
			"price": 35,
			"summary": "Kolsyrad läsk med söt och uppfriskande smak.",
			"img": "src/assets/icons/drink.png"
		},
		{
			"name": "Coca-Cola Zero 33 cl",
			"category": "DRINK",
			"price": 35,
			"summary": "Sockerfri kolsyrad cola med kolasmak.",
			"img": "src/assets/icons/drink.png"
		},
		{
			"name": "Fanta 33 cl",
			"category": "DRINK",
			"price": 35,
			"summary": "Kolsyrad törsläckande apelsinläsk.",
			"img": "src/assets/icons/drink.png"
		},
		{
			"name": "Fanta Exotic 33 cl",
			"category": "DRINK",
			"price": 35,
			"summary": "Kolsyrad läsk med tropisk smak.",
			"img": "src/assets/icons/drink.png"
		},
		{
			"name": "Loka Naturell 33 cl",
			"category": "DRINK",
			"price": 35,
			"summary": "Mineralvatten med ren och frisk smak.",
			"img": "src/assets/icons/drink.png"
		},
		{
			"name": "Red Bull Original 250ml",
			"category": "DRINK",
			"price": 45,
			"summary": "Energidryck som ökar fokus och energi.",
			"img": "src/assets/icons/drink.png"
		}
	],
	"toppings": [
		{
			"name": "Räksallad",
			"category": "TOPPING",
			"price": 10,
			"summary": "Krämig räksallad som passar utmärkt till topping.",
			"img": "src/assets/icons/topping.png",
			"allergenes": ["ägg", "skaldjur"]
		},
		{
			"name": "Gurkmajonäs",
			"category": "TOPPING",
			"price": 8,
			"summary": "Mild och krämig gurkmajonäs till kôrven.",
			"img": "src/assets/icons/topping.png",
			"allergenes": ["ägg"]
		},
		{
			"name": "Rostad lök",
			"category": "TOPPING",
			"price": 5,
			"summary": "Krispig rostad lök ger extra smak.",
			"img": "src/assets/icons/topping.png"
		},
		{
			"name": "Skagenröra",
			"category": "TOPPING",
			"price": 10,
			"summary": "Lyxig skagenröra med det lilla extra.",
			"img": "src/assets/icons/topping.png",
			"allergenes": ["ägg", "skaldjur"]
		},
		{
			"name": "Bostongurka",
			"category": "TOPPING",
			"price": 5,
			"summary": "Syrlig och söt bostongurka, perfekt till topping.",
			"img": "src/assets/icons/topping.png"
		}
	]
}
```
