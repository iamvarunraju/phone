// ═══════════════════════════════════════════════════════
//  AYYO RASAYANA — ATLAS JS
//  Cursor · DB · Render · Map · Yatra · Modal · Surprise
// ═══════════════════════════════════════════════════════

// ── CURSOR ──
(function(){
  const c=document.getElementById('cur'),r=document.getElementById('curR');
  if(!c)return;
  if('ontouchstart'in window||navigator.maxTouchPoints>0){
    c.style.display='none';if(r)r.style.display='none';
    document.body.style.cursor='auto';return;
  }
  let tx=0,ty=0,cx=0,cy=0;
  document.addEventListener('mousemove',e=>{
    tx=e.clientX;ty=e.clientY;
    c.style.transform=`translate(${tx}px,${ty}px) translate(-50%,-50%)`;
  });
  (function a(){cx+=(tx-cx)*.1;cy+=(ty-cy)*.1;
    r.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(a);})();
  document.addEventListener('mousedown',()=>c.classList.add('big'));
  document.addEventListener('mouseup',()=>c.classList.remove('big'));
})();

// ── TOAST ──
function toast(icon,msg,color='var(--marigold)'){
  const t=document.getElementById('toaster');
  const el=document.createElement('div');
  el.className='toast';
  el.innerHTML=`<i class="${icon}" style="color:${color}"></i> ${msg}`;
  t.appendChild(el);
  setTimeout(()=>{el.style.animation='toastOut .3s forwards';setTimeout(()=>el.remove(),300);},3200);
}

// ═══════════════════════════════════════════════════════
//  DATABASE
// ═══════════════════════════════════════════════════════
const SOUTH=['Telangana','Andhra Pradesh','Tamil Nadu','Kerala','Karnataka'];
const COASTAL=['Kerala','Goa','Andhra Pradesh','West Bengal','Odisha','Assam'];
const NORTH=['Punjab','Uttar Pradesh','Rajasthan','Himachal Pradesh','Jammu & Kashmir','Madhya Pradesh','Bihar'];

const db={
  "Telangana":{
    desc:"A rich tapestry of Nizami royal courts and robust Telugu spice.",
    lore:"Hyderabad's biryani is cooked 'dum' style — sealed under dough, creating a royal pressure chamber of flavour.",
    dishes:[
      {name:"Hyderabadi Dum Biryani",desc:"Slow-cooked basmati and meat sealed under dough, infused with saffron, kewra, and whole spices.",spice:3,veg:false,
       img:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400",
       lore:"The dum technique was introduced by Nizam Asaf Jah I's royal chefs in the early 18th century. It is now Hyderabad's greatest cultural export.",
       vlogs:[{title:"The Best Biryani Hunt in Hyderabad",author:"@iamvarunraju",url:"https://www.instagram.com/reel/DT7-JL5kxSJ/",thumb:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400"}],
       places:[{id:"ts1",name:"Cafe Bahar",loc:"Basheer Bagh, Hyderabad",lat:17.394,lng:78.4845},{id:"ts2",name:"Bawarchi",loc:"RTC X Roads, Hyderabad",lat:17.4275,lng:78.4425},{id:"ts3",name:"Shadab Hotel",loc:"High Court Rd, Hyderabad",lat:17.3817,lng:78.4646}]},
      {name:"Gongura Mutton",desc:"Fierce mutton slow-cooked with tart sorrel leaves — Andhra's most beloved and fiery combination.",spice:5,veg:false,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"Gongura (sorrel) is called the Green Gold of Andhra. Its electric sourness cuts through the richest mutton fat like nothing else.",
       vlogs:[{title:"Gongura Mutton — The Pride of Telangana",author:"@SpiceSeeker",url:"https://www.youtube.com/results?search_query=gongura+mutton",thumb:"https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=400"}],
       places:[{id:"ts4",name:"Spicy Venue",loc:"Jubilee Hills, Hyderabad",lat:17.4325,lng:78.407}]},
      {name:"Sakinalu",desc:"Sesame-studded rice flour spirals, deep-fried to golden. A beloved Sankranti festival snack.",spice:1,veg:true,
       img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
       lore:"Sakinalu are traditionally made by women on Makar Sankranti morning, hand-drawn in spirals before frying.",
       vlogs:[{title:"Making Traditional Sakinalu",author:"@TelanganaTaste",url:"https://www.youtube.com/results?search_query=sakinalu+recipe",thumb:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}],
       places:[{id:"ts5",name:"Chutneys",loc:"Jubilee Hills, Hyderabad",lat:17.434,lng:78.406}]}
    ]
  },
  "Andhra Pradesh":{
    desc:"The undisputed capital of fierce heat — Guntur chilli, coastal seafood, and fiery rice thalis.",
    lore:"Andhra uses Guntur Sannam chillies — among the world's hottest varieties — grown in the Krishna-Godavari delta.",
    dishes:[
      {name:"Nellore Chepala Pulusu",desc:"Tangy, deeply-spiced fish curry from Nellore's famous sea catch, cooked in a tamarind-chilli broth.",spice:4,veg:false,
       img:"https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
       lore:"Nellore fish curry is traditionally served in earthen pots that lend a unique mineral flavour. The coastal fish is never substituted.",
       vlogs:[{title:"Authentic Nellore Fish Curry",author:"@CoastalEats",url:"https://www.youtube.com/results?search_query=nellore+chepala+pulusu",thumb:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400"}],
       places:[{id:"ap1",name:"Kritunga Restaurant",loc:"Visakhapatnam",lat:17.7148,lng:83.3246},{id:"ap2",name:"Hotel Dwaraka",loc:"Nellore",lat:14.4426,lng:79.9865}]},
      {name:"Pesarattu",desc:"Crispy green moong dal crepes — Andhra's answer to the dosa. Served with ginger chutney at dawn.",spice:2,veg:true,
       img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
       lore:"The 'MLA Pesarattu' served at Andhra's state assembly canteen became so legendary it put the dish on the national map.",
       vlogs:[{title:"Andhra Breakfast Deep Dive",author:"@TeluguFood",url:"https://www.youtube.com/results?search_query=pesarattu+andhra",thumb:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}],
       places:[{id:"ap3",name:"Hotel Minerva",loc:"Vijayawada",lat:16.5062,lng:80.648}]}
    ]
  },
  "Tamil Nadu":{
    desc:"The ancient heartland of Dravidian cuisine, Chettinad fire, and banana-leaf sadhyas.",
    lore:"A traditional Tamil sadhya can carry up to 64 different preparations on a single banana leaf — all served simultaneously.",
    dishes:[
      {name:"Chettinad Chicken",desc:"A ferocious complex of 18 roasted spices unique to the Chettinad trading community — kalpasi, marathi mokku, star anise.",spice:5,veg:false,
       img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
       lore:"Chettinad masala uses spices sourced from Southeast Asia by merchant families who traded across the Bay of Bengal for centuries.",
       vlogs:[{title:"Making Authentic Chettinad Masala",author:"@HeritageEats",url:"https://www.youtube.com/results?search_query=chettinad+chicken",thumb:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}],
       places:[{id:"tn1",name:"Ponnusamy Hotel",loc:"Egmore, Chennai",lat:13.0827,lng:80.2707},{id:"tn2",name:"Anjappar",loc:"T Nagar, Chennai",lat:13.0418,lng:80.2341}]},
      {name:"Kuzhi Paniyaram",desc:"Pillowy dumplings from fermented idli batter cooked in cast-iron moulds. Crispy outside, cloud-soft inside.",spice:2,veg:true,
       img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
       lore:"The kuzhi (pit) pan is made of iron or brass and old Tamil families pass them down as heirlooms for generations.",
       vlogs:[{title:"Grandma's Kuzhi Paniyaram",author:"@KaiyendiBhavan",url:"https://www.youtube.com/results?search_query=kuzhi+paniyaram",thumb:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400"}],
       places:[{id:"tn3",name:"Murugan Idli Shop",loc:"Madurai",lat:9.9252,lng:78.1198}]}
    ]
  },
  "Kerala":{
    desc:"The Malabar spice coast — coconut oil, curry leaves, and fishermen's stews that started empires.",
    lore:"Kerala's Malabar coast was the original spice route that led Vasco da Gama across the Indian Ocean in 1498.",
    dishes:[
      {name:"Karimeen Pollichathu",desc:"Pearl spot fish marinated in red masala, wrapped in banana leaf, grilled over live coals. A toddy shop legend.",spice:3,veg:false,
       img:"https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
       lore:"Karimeen (pearl spot fish) is found only in Kerala's backwaters and is the official state fish. No substitute exists.",
       vlogs:[{title:"Backwater Toddy Shop Food",author:"@KeralaFoodie",url:"https://www.youtube.com/results?search_query=karimeen+pollichathu",thumb:"https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400"}],
       places:[{id:"kl1",name:"Paragon Restaurant",loc:"Kozhikode",lat:11.2588,lng:75.7804},{id:"kl2",name:"Fusion Bay",loc:"Alleppey",lat:9.4981,lng:76.3388}]},
      {name:"Appam & Ishtu",desc:"Lacy fermented rice hoppers with a gentle coconut milk vegetable stew. Kerala at its most delicate.",spice:1,veg:true,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"The lacy edges of appam are achieved through rice and coconut fermentation alone — no yeast, no shortcuts. Just time.",
       vlogs:[{title:"Perfect Appam at Home",author:"@MalayalamKitchen",url:"https://www.youtube.com/results?search_query=appam+kerala",thumb:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}],
       places:[{id:"kl3",name:"Villa Maya",loc:"Thiruvananthapuram",lat:8.5241,lng:76.9366}]}
    ]
  },
  "Karnataka":{
    desc:"Ancient Udupi temple cuisine, royal Mysore flavours, and the wild spice of Coorg.",
    lore:"Udupi cuisine was invented by the 13th-century philosopher Madhvacharya. It is entirely vegetarian and has shaped dosa culture worldwide.",
    dishes:[
      {name:"Bisi Bele Bath",desc:"A steaming one-pot meal of rice, lentils, and vegetables in a tamarind-spice broth, crowned with ghee.",spice:3,veg:true,
       img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
       lore:"Bisi Bele Bath (hot lentil rice) is said to have originated in the Mysore Palace kitchens of the 17th century Wadiyar kings.",
       vlogs:[{title:"Best Bisi Bele Bath in Bengaluru",author:"@OotaAytha",url:"https://www.youtube.com/results?search_query=bisi+bele+bath",thumb:"https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=400"}],
       places:[{id:"ka1",name:"MTR (Mavalli Tiffin Rooms)",loc:"Lalbagh, Bangalore",lat:12.951,lng:77.5932},{id:"ka2",name:"Hotel Janatha",loc:"Malleshwaram, Bangalore",lat:13.0034,lng:77.5644}]},
      {name:"Coorg Pandi Curry",desc:"Kodava pork curry with kachampuli — a sour, smoky fruit vinegar found only in Coorg's rainforest.",spice:4,veg:false,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"Kachampuli is extracted from Garcinia gummigutta, a wild Coorg fruit. It cannot be replaced by any vinegar in the world.",
       vlogs:[{title:"Coorg: India's Hidden Food Paradise",author:"@WildKitchenIndia",url:"https://www.youtube.com/results?search_query=coorg+pandi+curry",thumb:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400"}],
       places:[{id:"ka3",name:"Coorg Cuisine Restaurant",loc:"Madikeri, Coorg",lat:12.4244,lng:75.7382}]}
    ]
  },
  "Maharashtra":{
    desc:"Mill-worker street food, Konkani coconut curries, and the great Bombay Irani café culture.",
    lore:"Vada Pav was invented in 1966 by Ashok Vaidya outside Dadar station — designed as cheap, filling lunch for textile mill workers.",
    dishes:[
      {name:"Vada Pav",desc:"The spiced potato dumpling in a soft bun smothered in dry garlic and green chutneys. Mumbai's soul food.",spice:4,veg:true,
       img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
       lore:"Over 4 lakh vada pavs are consumed daily in Mumbai alone. It has been called 'the Indian burger' but that comparison doesn't do it justice.",
       vlogs:[{title:"Mumbai's Best Secret Vada Pav Stall",author:"@StreetFoodIndia",url:"https://www.youtube.com/results?search_query=mumbai+vada+pav",thumb:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}],
       places:[{id:"mh1",name:"Ashok Vada Pav",loc:"Dadar, Mumbai",lat:19.0196,lng:72.8428}]}
    ]
  },
  "Goa":{
    desc:"Where Portuguese history and Konkan spice collide under salt air and palm trees.",
    lore:"Goan vinegar (toddy vinegar) is fermented from coconut palm sap — entirely unlike any European vinegar, impossible to replicate.",
    dishes:[
      {name:"Goan Fish Curry",desc:"Kokum-infused coconut gravy with ladyfish or kingfish. Bright, tangy, irreplaceable.",spice:3,veg:false,
       img:"https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
       lore:"Goans eat fish curry and rice for breakfast — a tradition from Portuguese colonial times when the workday started before dawn.",
       vlogs:[{title:"Traditional Goan Seafood Thali",author:"@GoaDiaries",url:"https://www.youtube.com/results?search_query=goan+fish+curry",thumb:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400"}],
       places:[{id:"ga1",name:"Ritz Classic",loc:"Panaji",lat:15.4909,lng:73.8278}]}
    ]
  },
  "Gujarat":{
    desc:"Sweet, salty, sour — the vegetarian triumph of western India, where every thali is a philosophy.",
    lore:"A Gujarati thali achieves perfect shadrasa — all six Ayurvedic tastes: sweet, sour, salty, spicy, bitter, and astringent.",
    dishes:[
      {name:"Khaman Dhokla",desc:"Steamed, savory chickpea flour sponge — light, tangy, topped with mustard seeds and fresh coriander.",spice:1,veg:true,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"Dhokla is fermented overnight, making it a probiotic-rich food. Ancient Ayurveda texts describe a nearly identical dish 2000 years ago.",
       vlogs:[{title:"Ahmedabad Street Food Tour",author:"@GujjuEats",url:"https://www.youtube.com/results?search_query=khaman+dhokla",thumb:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400"}],
       places:[{id:"gj1",name:"Das Khaman",loc:"Ahmedabad",lat:23.0225,lng:72.5714}]}
    ]
  },
  "Rajasthan":{
    desc:"Desert cuisine — rich ghee, sun-dried ingredients, and recipes born in warrior-era Rajput kitchens.",
    lore:"Laal Maas was originally made with wild boar hunted by Rajput soldiers on campaign. The scarlet colour comes from Mathania chillies, not tomatoes.",
    dishes:[
      {name:"Laal Maas",desc:"A fiery, deep scarlet mutton curry made with Mathania chillies and yoghurt — born in the royal hunting camps of Rajput kings.",spice:5,veg:false,
       img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
       lore:"Mathania chillies are grown in a single village near Jodhpur. No other chilli produces the same depth of burgundy colour and fragrant heat.",
       vlogs:[{title:"Fiery Rajputana Mutton Curry",author:"@RajwadiFlavors",url:"https://www.youtube.com/results?search_query=laal+maas",thumb:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400"}],
       places:[{id:"rj1",name:"Handi Restaurant",loc:"Jaipur",lat:26.9124,lng:75.7873}]}
    ]
  },
  "Punjab":{
    desc:"Tandoors blazing at dawn, dairy rivers, and the boldest buttered flavours anywhere in the world.",
    lore:"The makhani sauce was invented accidentally by Kundan Lal Gujral of Moti Mahal, Delhi in 1947 — using leftover tandoori chicken.",
    dishes:[
      {name:"Butter Chicken",desc:"Tandoori chicken in a creamy makhani gravy — gentle heat, royal richness, timeless elegance.",spice:2,veg:false,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"Butter Chicken was voted the world's most popular Indian dish in 2023. Kundan Lal's grandson still runs the original Moti Mahal.",
       vlogs:[{title:"Dhaba Style Butter Chicken",author:"@PunjabiTadka",url:"https://www.youtube.com/results?search_query=punjabi+butter+chicken",thumb:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400"}],
       places:[{id:"pb1",name:"Kesar Da Dhaba",loc:"Amritsar",lat:31.634,lng:74.8723}]}
    ]
  },
  "West Bengal":{
    desc:"Mustard oil, freshwater fish, and the world's most sophisticated tradition of sweet-making.",
    lore:"Bengali mishti (sweets) use chhena — fresh cottage cheese — a technique introduced by Portuguese traders in the 17th century.",
    dishes:[
      {name:"Kosha Mangsho",desc:"Slow-cooked mutton in a deep, velvety dark gravy — cooked until the fat separates and the bone surrenders.",spice:3,veg:false,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"'Kosha' means to sauté very slowly. A proper kosha can take 3 hours over a wood fire. The patience is the recipe.",
       vlogs:[{title:"Sunday Mutton Curry — Bengali Style",author:"@BongEats",url:"https://www.youtube.com/results?search_query=kosha+mangsho",thumb:"https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=400"}],
       places:[{id:"wb1",name:"Golbari",loc:"Shyambazar, Kolkata",lat:22.5949,lng:88.3683}]}
    ]
  },
  "Odisha":{
    desc:"Ancient temple food, banana flower curries, and the quietest genius in Indian cuisine.",
    lore:"The Jagannath Temple in Puri cooks for up to 10,000 pilgrims daily — making it the world's largest operating temple kitchen.",
    dishes:[
      {name:"Dalma",desc:"Lentils cooked with raw papaya, banana, and yam — a temple-food staple of extraordinary humility and wisdom.",spice:1,veg:true,
       img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
       lore:"Dalma has been cooked as prasad for Lord Jagannath for over 800 years. The recipe has never changed.",
       vlogs:[{title:"Temple Food of Puri",author:"@KalingaKitchen",url:"https://www.youtube.com/results?search_query=odisha+dalma",thumb:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"}],
       places:[{id:"od1",name:"Wildgrass Restaurant",loc:"Bhubaneswar",lat:20.2961,lng:85.8245}]}
    ]
  },
  "Assam":{
    desc:"Indigenous herbs, bamboo shoot, and the sourness of elephant apple in a green and misty landscape.",
    lore:"Assam's 'tenga' (sour) flavour profile is unique in all of Indian cuisine. The sourness is said to aid digestion in the tropical heat.",
    dishes:[
      {name:"Masor Tenga",desc:"A light, clean, and vibrantly sour fish curry with elephant apple or tomato. Assam's most beloved everyday dish.",spice:2,veg:false,
       img:"https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
       lore:"Masor Tenga is Assam's de facto state dish. The sourness is not a flavour — it's a philosophy of lightness.",
       vlogs:[{title:"Cooking with Elephant Apple",author:"@NENorthEast",url:"https://www.youtube.com/results?search_query=masor+tenga",thumb:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400"}],
       places:[{id:"as1",name:"Paradise Restaurant",loc:"Guwahati",lat:26.1445,lng:91.7362}]}
    ]
  },
  "Bihar":{
    desc:"Rustic, earthy cooking forged in the Indo-Gangetic plains — ancient, honest, and enduring.",
    lore:"Litti Chokha was the food of Bihari soldiers and farmers. It could be cooked over a dung fire and survived days of travel without spoiling.",
    dishes:[
      {name:"Litti Chokha",desc:"Roasted wheat balls stuffed with sattu, served with fire-roasted vegetable mash. Ancient, sustaining, perfect.",spice:3,veg:true,
       img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
       lore:"Litti can be stored 3-4 days without refrigeration — making it the original travel food of ancient India.",
       vlogs:[{title:"Authentic Litti Chokha Making",author:"@DesiZaika",url:"https://www.youtube.com/results?search_query=litti+chokha",thumb:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400"}],
       places:[{id:"bh1",name:"DK Litti Chokha",loc:"Patna",lat:25.5941,lng:85.1376}]}
    ]
  },
  "Uttar Pradesh":{
    desc:"Awadhi slow-cooking, Tunday kebabs, and the most refined flatbread culture in the world.",
    lore:"The dum pukht technique — sealed pressure cooking over slow fire — was perfected in Lucknow's Nawabi kitchens in the 18th century.",
    dishes:[
      {name:"Tunday Kabab",desc:"Silk-smooth melt-in-the-mouth galawat kebabs made with 160 secret spices — a recipe guarded for 170 years.",spice:2,veg:false,
       img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
       lore:"Haji Murad Ali (nicknamed Tunday, meaning one-armed) invented this recipe in 1905 for the toothless Nawab of Awadh. The 160-spice formula is still secret.",
       vlogs:[{title:"The Secret of Tunday Kabab",author:"@LucknowiBawarchi",url:"https://www.youtube.com/results?search_query=tunday+kabab+lucknow",thumb:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400"}],
       places:[{id:"up1",name:"Tunday Kababi",loc:"Aminabad, Lucknow",lat:26.8467,lng:80.9462}]}
    ]
  },
  "Madhya Pradesh":{
    desc:"Malwa spice, tribal jungle flavours, and Indore's legendary street food culture.",
    lore:"Indore's Sarafa Bazaar transforms into a street food paradise at night — operating since the 17th century under the Holkar kings.",
    dishes:[
      {name:"Poha Jalebi",desc:"Flattened rice with turmeric and mustard seeds, served alongside crispy syrup-soaked jalebi spirals. MP's sacred morning ritual.",spice:1,veg:true,
       img:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
       lore:"Indore's poha-jalebi breakfast is considered the most iconic food pairing in Central India. Locals insist the jalebi must be hot from the kadhai.",
       vlogs:[{title:"Indore Food Trail — Poha Jalebi",author:"@MalwaEats",url:"https://www.youtube.com/results?search_query=indore+poha+jalebi",thumb:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400"}],
       places:[{id:"mp1",name:"Shree Bajrang Poha",loc:"Sarafa, Indore",lat:22.7193,lng:75.8577}]}
    ]
  },
  "Jammu & Kashmir":{
    desc:"Wazwan feasts, Pampore saffron, and the most ceremonially regal culinary tradition in India.",
    lore:"A Kashmiri Wazwan feast consists of 36 courses served on a single platter shared by four guests — an act of communal intimacy.",
    dishes:[
      {name:"Rogan Josh",desc:"Kashmiri lamb slow-cooked in a scarlet sauce coloured by Kashmiri chillies and maval flower — heat is secondary to colour.",spice:3,veg:false,
       img:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
       lore:"'Rogan' means clarified fat in Persian. The dish arrived in Kashmir with Emperor Akbar and was absorbed into Kashmiri Wazwan tradition over 400 years.",
       vlogs:[{title:"Wazwan — Kashmir's Royal Feast",author:"@ValleyFlavours",url:"https://www.youtube.com/results?search_query=kashmiri+rogan+josh",thumb:"https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400"}],
       places:[{id:"jk1",name:"Ahdoos Hotel",loc:"Lal Chowk, Srinagar",lat:34.0837,lng:74.7973}]}
    ]
  }
};

// ═══════════════════════════════════════════════════════
//  STATE & FILTER
// ═══════════════════════════════════════════════════════
const filterGroups={
  all:Object.keys(db),
  south:SOUTH,
  north:NORTH,
  coastal:COASTAL,
  veg:Object.keys(db)
};
let activeFilter='all',vegOnly=false,activeState=null;

// ═══════════════════════════════════════════════════════
//  MAP
// ═══════════════════════════════════════════════════════
const map=L.map('yatraMap',{center:[20.5937,78.9629],zoom:5,zoomControl:false,attributionControl:false});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.control.zoom({position:'bottomright'}).addTo(map);

let activeMarkers=[];
function clearPins(){activeMarkers.forEach(m=>map.removeLayer(m));activeMarkers=[]}

function makePin(lat,lng,name,loc){
  const icon=L.divIcon({className:'',html:`<div class="ayyo-pin"><div class="pin-pulse"></div><div class="pin-core"></div></div>`,iconSize:[44,44],iconAnchor:[22,22]});
  return L.marker([lat,lng],{icon}).addTo(map)
    .bindPopup(`<div class="popup-name">${name}</div><div class="popup-loc"><i class="fa-solid fa-location-dot" style="color:var(--marigold);margin-right:3px"></i>${loc}</div>`);
}

window.locate=function(lat,lng,name,loc){
  clearPins();
  map.flyTo([lat,lng],14,{duration:1.5});
  setTimeout(()=>{const m=makePin(lat,lng,name,loc);activeMarkers.push(m);m.openPopup();},1200);
};

// ═══════════════════════════════════════════════════════
//  YATRA
// ═══════════════════════════════════════════════════════
let yatraData=[],yatraLine=null,yatraRouteMarkers=[];

function updateYatraBadge(){
  const num=document.getElementById('yatraNum');
  const pill=document.getElementById('yatraPill');
  const cnt=document.getElementById('ywCount');
  num.textContent=yatraData.length;
  cnt.textContent=`${yatraData.length} stop${yatraData.length!==1?'s':''} planned`;
  pill.classList.toggle('has-stops',yatraData.length>0);
}

function renderYatraList(){
  const list=document.getElementById('yatraList');
  list.innerHTML='';
  yatraData.forEach((s,i)=>{
    const li=document.createElement('li');
    li.className='yatra-stop';
    li.innerHTML=`<span class="stop-n">${i+1}</span><span style="flex:1">${s.name}</span><button class="stop-del" onclick="removeStop('${s.id}')"><i class="fa-solid fa-xmark"></i></button>`;
    list.appendChild(li);
  });
}

window.addYatra=function(id,name,lat,lng){
  if(yatraData.some(s=>s.id===id)){toast('fa-solid fa-circle-info',`${name} already in your Yatra`,'var(--parch-dim)');return;}
  yatraData.push({id,name,lat,lng});
  document.getElementById('yatraWidget').classList.add('active');
  renderYatraList();updateYatraBadge();
  syncYatraBtns();
  toast('fa-solid fa-plus',`<b>${name}</b> added to Yatra`);
};

window.removeStop=function(id){
  yatraData=yatraData.filter(s=>s.id!==id);
  renderYatraList();updateYatraBadge();
  syncYatraBtns();
  if(yatraData.length===0){document.getElementById('yatraWidget').classList.remove('active');}
};

window.clearYatra=function(){
  yatraData=[];renderYatraList();updateYatraBadge();syncYatraBtns();
  if(yatraLine){map.removeLayer(yatraLine);yatraLine=null;}
  yatraRouteMarkers.forEach(m=>map.removeLayer(m));yatraRouteMarkers=[];
  document.getElementById('yatraWidget').classList.remove('active');
  toast('fa-solid fa-trash-can','Yatra cleared','var(--sindoor)');
};

window.drawRoute=function(){
  if(yatraData.length<2){toast('fa-solid fa-triangle-exclamation','Add at least 2 stops to map the route','var(--sindoor)');return;}
  if(yatraLine)map.removeLayer(yatraLine);
  yatraRouteMarkers.forEach(m=>map.removeLayer(m));clearPins();
  const ll=yatraData.map(s=>[s.lat,s.lng]);
  yatraLine=L.polyline(ll,{color:'#F5A623',weight:3,opacity:.8,dashArray:'8 8'}).addTo(map);
  yatraData.forEach((s,i)=>{
    const ic=L.divIcon({className:'',html:`<div class="route-dot">${i+1}</div>`,iconSize:[26,26],iconAnchor:[13,13]});
    yatraRouteMarkers.push(L.marker([s.lat,s.lng],{icon:ic}).addTo(map).bindPopup(`<div class="popup-name">${s.name}</div>`));
  });
  map.fitBounds(yatraLine.getBounds(),{padding:[60,60],duration:1.5});
  toast('fa-solid fa-route',`Route mapped — ${yatraData.length} stops`);
};

function syncYatraBtns(){
  // Reset all
  document.querySelectorAll('[id^="addbtn-"]').forEach(b=>{
    b.classList.remove('added');b.innerHTML='<i class="fa-solid fa-plus"></i>';
  });
  // Set added state
  yatraData.forEach(s=>{
    ['addbtn-','maddbtn-'].forEach(prefix=>{
      const b=document.getElementById(prefix+s.id);
      if(b){b.classList.add('added');b.innerHTML='<i class="fa-solid fa-check"></i>';}
    });
  });
}

window.toggleYatraWidget=function(){
  if(yatraData.length===0){toast('fa-solid fa-route','Add stops to start your Yatra','var(--parch-dim)');return;}
  document.getElementById('yatraWidget').classList.toggle('active');
};

// ═══════════════════════════════════════════════════════
//  SPICE METER
// ═══════════════════════════════════════════════════════
function updateSpiceMeter(lvl){
  document.querySelectorAll('.sm-pip').forEach((p,i)=>{
    p.className='sm-pip';
    if(i<lvl)p.classList.add(lvl>=4?'fire':'lit');
  });
}

// ═══════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════
function makePips(lvl){
  let h='<div class="spice-pips">';
  for(let i=1;i<=5;i++)h+=`<div class="spip${i<=lvl?(lvl>=4?' on hot':' on'):''}"></div>`;
  return h+'</div>';
}

// ═══════════════════════════════════════════════════════
//  RENDER RESULTS
// ═══════════════════════════════════════════════════════
function renderResults(stateName){
  activeState=stateName;
  const data=db[stateName];if(!data)return;
  const isSouth=SOUTH.includes(stateName);
  document.getElementById('mapStateTxt').textContent=stateName;
  const avgSpice=Math.round(data.dishes.reduce((a,d)=>a+d.spice,0)/data.dishes.length);
  updateSpiceMeter(avgSpice);
  if(data.dishes[0]?.places[0]){
    const p=data.dishes[0].places[0];
    map.flyTo([p.lat,p.lng],7,{duration:1.5});
  }

  const dishes=vegOnly?data.dishes.filter(d=>d.veg):data.dishes;
  let html=`
    <div class="region-intro">
      <div class="region-flag">${isSouth?'⭐ SOUTH INDIA · ':''} ${stateName.toUpperCase()}</div>
      <div class="region-name">${stateName}</div>
      <p class="region-desc">${data.desc}</p>
    </div>
    ${data.lore?`<div class="lore-box">${data.lore}</div>`:''}`;

  if(!dishes.length){
    html+=`<div class="empty-state" style="padding:2rem"><p class="empty-title" style="font-size:1.1rem">No Veg Dishes Found</p><p class="empty-sub">Disable the veg filter to see all dishes</p></div>`;
  }

  dishes.forEach((dish,dishIdx)=>{
    // Vlogs
    let vlHTML=`<div class="exp-section-title"><i class="fa-brands fa-youtube"></i> Creator Vlogs</div><div class="vlog-row">`;
    dish.vlogs.forEach(v=>{
      vlHTML+=`<a href="${v.url}" target="_blank" class="vlog-card" onclick="event.stopPropagation()">
        <img src="${v.thumb}" alt="${v.title}" class="vlog-thumb" loading="lazy">
        <div class="vlog-overlay"><div class="vlog-title">${v.title}</div><div class="vlog-author">${v.author}</div></div>
        <div class="play-btn"><i class="fa-solid fa-circle-play"></i></div>
      </a>`;
    });
    vlHTML+=`</div>`;

    // Places
    let plHTML=`<div class="exp-section-title"><i class="fa-solid fa-map-pin"></i> Where to Eat</div>`;
    dish.places.forEach(pl=>{
      plHTML+=`<div class="place-card">
        <div class="place-info">
          <h5>${pl.name}</h5>
          <div class="place-loc"><i class="fa-solid fa-location-dot"></i>${pl.loc}</div>
        </div>
        <div class="place-btns">
          <button class="pbtn" title="Locate" onclick="locate(${pl.lat},${pl.lng},'${pl.name}','${pl.loc}');event.stopPropagation()"><i class="fa-solid fa-crosshairs"></i></button>
          <button class="pbtn" id="addbtn-${pl.id}" title="Add to Yatra" onclick="addYatra('${pl.id}','${pl.name}',${pl.lat},${pl.lng});event.stopPropagation()"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>`;
    });

    const loreHTML=dish.lore?`<div class="exp-section-title" style="margin-top:.8rem"><i class="fa-solid fa-scroll"></i> Lore</div><div class="lore-box" style="margin:0 0 .5rem">${dish.lore}</div>`:'';

    const b1=`<span class="badge b-spice">${makePips(dish.spice)} ${dish.spice}/5</span>`;
    const b2=dish.veg?`<span class="badge b-veg"><i class="fa-solid fa-leaf"></i> Pure Veg</span>`:`<span class="badge b-nonveg"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg</span>`;
    const b3=dish.spice>=4?`<span class="badge b-fire"><i class="fa-solid fa-fire"></i> Fiery</span>`:'';

    html+=`<div class="dish-card" data-state="${stateName}" data-dish="${dishIdx}" onclick="handleDishTap(this,event)">
      <div class="dish-header">
        <div class="dish-thumb"><img src="${dish.img}" alt="${dish.name}" loading="lazy"></div>
        <div class="dish-info">
          <div class="dish-name">${dish.name}</div>
          <p class="dish-desc">${dish.desc}</p>
          <div class="badges">${b1}${b2}${b3}</div>
        </div>
        <i class="fa-solid fa-chevron-down dish-chevron"></i>
        <i class="fa-solid fa-arrow-up-right-from-square mobile-arrow"></i>
      </div>
      <div class="expanded-content">
        <div class="expanded-inner">
          ${loreHTML}${vlHTML}${plHTML}
        </div>
      </div>
    </div>`;
  });

  const rc=document.getElementById('resultsContainer');
  rc.innerHTML=html;
  syncYatraBtns();

  // Mobile: auto-open panel
  if(window.innerWidth<=900&&!panelOpen){
    panelOpen=true;
    document.getElementById('discPanel').classList.add('open');
    const tb=document.getElementById('panelToggleBtn');
    if(tb)tb.innerHTML='<i class="fa-solid fa-xmark"></i><span>Close</span>';
  }

  // Animate
  rc.style.opacity='0';rc.style.transform='translateY(12px)';
  setTimeout(()=>{rc.style.transition='opacity .4s ease,transform .4s ease';rc.style.opacity='1';rc.style.transform='translateY(0)';},40);
}

// ═══════════════════════════════════════════════════════
//  DISH TAP — modal on mobile, expand on desktop
// ═══════════════════════════════════════════════════════
window.handleDishTap=function(card,event){
  if(event.target.closest('.place-btns')||event.target.closest('.vlog-card')||event.target.closest('a'))return;
  if(window.innerWidth<=900){
    openModal(card.dataset.state,parseInt(card.dataset.dish));return;
  }
  document.querySelectorAll('.dish-card').forEach(c=>{if(c!==card)c.classList.remove('open');});
  card.classList.toggle('open');
};

// ═══════════════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════════════
function openModal(stateName,dishIdx){
  const dish=db[stateName].dishes[dishIdx];if(!dish)return;
  const b1=`<span class="badge b-spice">${makePips(dish.spice)} Spice ${dish.spice}/5</span>`;
  const b2=dish.veg?`<span class="badge b-veg"><i class="fa-solid fa-leaf"></i> Pure Veg</span>`:`<span class="badge b-nonveg"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg</span>`;
  const b3=dish.spice>=4?`<span class="badge b-fire"><i class="fa-solid fa-fire"></i> Fiery</span>`:'';
  let vlHTML='<div class="vlog-row">';
  dish.vlogs.forEach(v=>{
    vlHTML+=`<a href="${v.url}" target="_blank" class="vlog-card" style="min-width:165px">
      <img src="${v.thumb}" alt="${v.title}" class="vlog-thumb" loading="lazy">
      <div class="vlog-overlay"><div class="vlog-title">${v.title}</div><div class="vlog-author">${v.author}</div></div>
      <div class="play-btn"><i class="fa-solid fa-circle-play"></i></div>
    </a>`;
  });
  vlHTML+='</div>';
  let plHTML='';
  dish.places.forEach(pl=>{
    plHTML+=`<div class="place-card">
      <div class="place-info"><h5>${pl.name}</h5><div class="place-loc"><i class="fa-solid fa-location-dot"></i>${pl.loc}</div></div>
      <div class="place-btns">
        <button class="pbtn" onclick="locate(${pl.lat},${pl.lng},'${pl.name}','${pl.loc}');closeModal()"><i class="fa-solid fa-crosshairs"></i></button>
        <button class="pbtn" id="maddbtn-${pl.id}" onclick="addYatra('${pl.id}','${pl.name}',${pl.lat},${pl.lng});syncYatraBtns()"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>`;
  });
  document.getElementById('modalContent').innerHTML=`
    <img src="${dish.img}" alt="${dish.name}" class="modal-hero-img" loading="lazy">
    <div class="modal-body">
      <div class="modal-region"><i class="fa-solid fa-fire" style="color:var(--marigold)"></i> ${stateName}${SOUTH.includes(stateName)?' · South India':''}</div>
      <h2 class="modal-title">${dish.name}</h2>
      <p class="modal-desc">${dish.desc}</p>
      <div class="modal-badges">${b1}${b2}${b3}</div>
      ${dish.lore?`<div class="modal-lore">${dish.lore}</div>`:''}
      <div class="modal-sub"><i class="fa-brands fa-youtube"></i> Creator Vlogs</div>
      ${vlHTML}
      <div class="modal-sub"><i class="fa-solid fa-map-pin"></i> Where to Eat</div>
      ${plHTML}
      <div class="modal-actions">
        <button class="mbtn-primary" onclick="addYatra('${dish.places[0].id}','${dish.places[0].name}',${dish.places[0].lat},${dish.places[0].lng});syncYatraBtns()">
          <i class="fa-solid fa-plus"></i> Add to Yatra
        </button>
        <button class="mbtn-ghost" onclick="shareIt('${dish.name}','${stateName}')">
          <i class="fa-solid fa-share-nodes"></i>
        </button>
        <button class="mbtn-ghost" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>`;
  // sync modal yatra buttons
  setTimeout(()=>{
    yatraData.forEach(s=>{
      const b=document.getElementById('maddbtn-'+s.id);
      if(b){b.classList.add('added');b.innerHTML='<i class="fa-solid fa-check"></i>';}
    });
  },50);
  const overlay=document.getElementById('modalOverlay');
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
  // swipe down to close
  const sheet=document.getElementById('modalSheet');
  let mty=0;
  sheet.addEventListener('touchstart',e=>{mty=e.touches[0].clientY;},{passive:true});
  sheet.ontouchend=e=>{if(e.changedTouches[0].clientY-mty>80)closeModal();};
}

window.closeModal=function(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
};

window.shareIt=function(name,state){
  const txt=`🪔 ${name} from ${state} — discover it on AYYO, the Pan-Indian Culinary Atlas!`;
  if(navigator.share)navigator.share({title:name,text:txt});
  else navigator.clipboard.writeText(txt).then(()=>toast('fa-solid fa-check','Copied to clipboard!'));
};

// ═══════════════════════════════════════════════════════
//  SURPRISE ME
// ═══════════════════════════════════════════════════════
window.surpriseMe=function(){
  const states=Object.keys(db);
  const s=states[Math.floor(Math.random()*states.length)];
  const di=Math.floor(Math.random()*db[s].dishes.length);
  const btn=document.querySelector('[onclick="surpriseMe()"]');
  if(btn){btn.classList.add('surprise-flash');setTimeout(()=>btn.classList.remove('surprise-flash'),600);}
  renderResults(s);
  document.querySelectorAll('.schip').forEach(c=>c.classList.toggle('active',c.textContent===s));
  setTimeout(()=>openModal(s,di),350);
  toast('fa-solid fa-shuffle',`<b>${db[s].dishes[di].name}</b> — ${s}`);
};

// ═══════════════════════════════════════════════════════
//  VEG TOGGLE
// ═══════════════════════════════════════════════════════
window.toggleVeg=function(){
  vegOnly=!vegOnly;
  document.getElementById('vegBtn').classList.toggle('veg-active',vegOnly);
  if(activeState)renderResults(activeState);
};

// ═══════════════════════════════════════════════════════
//  FILTERS
// ═══════════════════════════════════════════════════════
window.setFilter=function(f,btn){
  activeFilter=f;
  document.querySelectorAll('.fchip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  let states=filterGroups[f]||Object.keys(db);
  if(f==='veg'){states=Object.keys(db).filter(s=>db[s].dishes.some(d=>d.veg));vegOnly=true;}
  else vegOnly=false;
  buildCarousel(states);
  if(activeState&&states.includes(activeState))renderResults(activeState);
  else if(activeState){activeState=null;showEmpty();}
};

function showEmpty(){
  document.getElementById('resultsContainer').innerHTML=`<div class="empty-state"><div class="empty-mandala"><div class="em-ring em-1"></div><div class="em-ring em-2"></div><div class="em-ring em-3"></div><div class="em-center">🪔</div></div><p class="empty-title">Namaskaram</p><p class="empty-sub">Search or tap a state to begin your culinary pilgrimage</p></div>`;
}

// ═══════════════════════════════════════════════════════
//  CAROUSEL
// ═══════════════════════════════════════════════════════
function buildCarousel(states){
  const c=document.getElementById('stateCarousel');
  c.innerHTML='';
  states.forEach(name=>{
    const btn=document.createElement('button');
    btn.className='schip'+(SOUTH.includes(name)?' south':'');
    btn.textContent=name;
    if(name===activeState)btn.classList.add('active');
    btn.onclick=()=>{
      document.querySelectorAll('.schip').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      renderResults(name);
    };
    c.appendChild(btn);
  });
}

// ═══════════════════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════════════════
document.getElementById('searchBox').addEventListener('input',function(){
  const q=this.value.trim().toLowerCase();
  document.getElementById('searchClear').classList.toggle('vis',q.length>0);
  if(!q){buildCarousel(filterGroups[activeFilter]||Object.keys(db));return;}
  const matched=Object.keys(db).filter(n=>{
    if(n.toLowerCase().includes(q))return true;
    return db[n].dishes.some(d=>d.name.toLowerCase().includes(q)||d.desc.toLowerCase().includes(q)||d.lore?.toLowerCase().includes(q));
  });
  buildCarousel(matched);
  if(matched.length===1)renderResults(matched[0]);
  else if(matched.length>0&&!matched.includes(activeState))renderResults(matched[0]);
});

window.clearSearch=function(){
  document.getElementById('searchBox').value='';
  document.getElementById('searchClear').classList.remove('vis');
  buildCarousel(filterGroups[activeFilter]||Object.keys(db));
};

// ═══════════════════════════════════════════════════════
//  MOBILE PANEL
// ═══════════════════════════════════════════════════════
let panelOpen=false;
const discPanel=document.getElementById('discPanel');
const ptBtn=document.getElementById('panelToggleBtn');

window.togglePanel=function(){
  panelOpen=!panelOpen;
  discPanel.classList.toggle('open',panelOpen);
  if(ptBtn)ptBtn.innerHTML=panelOpen?'<i class="fa-solid fa-xmark"></i><span>Close</span>':'<i class="fa-solid fa-fire"></i><span>Explore Dishes</span>';
};

// Swipe down to close
let swipeY=0;
discPanel.addEventListener('touchstart',e=>{swipeY=e.touches[0].clientY;},{passive:true});
discPanel.addEventListener('touchend',e=>{
  if(e.changedTouches[0].clientY-swipeY>65){
    panelOpen=false;discPanel.classList.remove('open');
    if(ptBtn)ptBtn.innerHTML='<i class="fa-solid fa-fire"></i><span>Explore Dishes</span>';
  }
},{passive:true});

// Tap map to close panel
document.getElementById('yatraMap').addEventListener('click',()=>{
  if(window.innerWidth<=900&&panelOpen){
    panelOpen=false;discPanel.classList.remove('open');
    if(ptBtn)ptBtn.innerHTML='<i class="fa-solid fa-fire"></i><span>Explore Dishes</span>';
  }
});

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════
buildCarousel(Object.keys(db));
updateYatraBadge();
