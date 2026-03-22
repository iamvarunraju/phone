// ============================================================
//  AYYO ATLAS — SCRIPT
//  Custom cursor · DB · Filters · Map · Yatra · Toast
// ============================================================

// --- CURSOR (desktop only) ---
(function initCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    if (!cursor) return;
    // Hide on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = 'none';
        if (trail) trail.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    let tx=0,ty=0,cx=0,cy=0;
    document.addEventListener('mousemove', e => {
        tx = e.clientX; ty = e.clientY;
        cursor.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
    });
    (function animTrail(){
        cx += (tx-cx)*0.1; cy += (ty-cy)*0.1;
        trail.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
        requestAnimationFrame(animTrail);
    })();
    document.addEventListener('mousedown', () => cursor.classList.add('big'));
    document.addEventListener('mouseup', () => cursor.classList.remove('big'));
})();

// --- TOAST ---
function showToast(icon, msg, color='var(--turmeric)') {
    const t = document.getElementById('toaster');
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<i class="${icon}" style="color:${color}"></i> ${msg}`;
    t.appendChild(el);
    setTimeout(() => {
        el.style.animation = 'toastOut 0.3s forwards';
        setTimeout(() => el.remove(), 300);
    }, 3000);
}

// ============================================================
//  DATABASE
// ============================================================
const SOUTH = ['Telangana','Andhra Pradesh','Tamil Nadu','Kerala','Karnataka'];
const COASTAL = ['Kerala','Goa','Andhra Pradesh','West Bengal','Odisha','Assam'];

const db = {
    "Telangana": {
        desc: "A rich tapestry of Nizami royal courts and robust Telugu spice traditions.",
        trivia: "Hyderabad's biryani is sealed under dough — a technique called 'dum' that creates a pressure-cooker of flavour within the pot.",
        dishes: [
            {
                name: "Hyderabadi Dum Biryani",
                desc: "Slow-cooked basmati and meat sealed with dough, infused with saffron and whole spices.",
                spice: 3, veg: false,
                img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400",
                trivia: "The 'dum' technique was introduced by Nizam's royal chefs in the 18th century.",
                vlogs: [
                    { title: "The Best Biryani Hunt in Hyderabad", author: "@iamvarunraju", url: "https://www.instagram.com/reel/DT7-JL5kxSJ/", thumb: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400" }
                ],
                places: [
                    { id: "ts1", name: "Cafe Bahar", loc: "Basheer Bagh, Hyderabad", lat: 17.3940, lng: 78.4845 },
                    { id: "ts2", name: "Bawarchi", loc: "Panjagutta, Hyderabad", lat: 17.4275, lng: 78.4425 },
                    { id: "ts3", name: "Shadab Hotel", loc: "High Court Road, Hyderabad", lat: 17.3817, lng: 78.4646 }
                ]
            },
            {
                name: "Gongura Mutton",
                desc: "Fierce mutton slow-cooked with tart sorrel leaves (gongura) — Andhra's most beloved combination.",
                spice: 5, veg: false,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "Gongura (sorrel) is called the 'Green Gold of Andhra'. Its sharp sourness cuts through rich mutton fat.",
                vlogs: [
                    { title: "Gongura Mutton — The Pride of Telangana", author: "@SpiceSeeker", url: "https://www.youtube.com/results?search_query=gongura+mutton", thumb: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=400" }
                ],
                places: [
                    { id: "ts4", name: "Spicy Venue", loc: "Jubilee Hills, Hyderabad", lat: 17.4325, lng: 78.4070 }
                ]
            },
            {
                name: "Sakinalu",
                desc: "Sesame-studded rice flour spirals, a festive Sankranti snack from Telangana villages.",
                spice: 1, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "Sakinalu are traditionally made during Makar Sankranti by women drawing rice spirals by hand.",
                vlogs: [
                    { title: "Making Traditional Sakinalu", author: "@TelanganaTaste", url: "https://www.youtube.com/results?search_query=sakinalu+recipe", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "ts5", name: "Chutneys", loc: "Jubilee Hills, Hyderabad", lat: 17.4340, lng: 78.4060 }
                ]
            }
        ]
    },
    "Andhra Pradesh": {
        desc: "The undisputed capital of fierce heat, red chilli masala, and rich coastal seafood.",
        trivia: "Andhra food uses Guntur Sannam chillies — one of the hottest varieties in the world, grown in the Krishna-Godavari delta.",
        dishes: [
            {
                name: "Nellore Chepala Pulusu",
                desc: "A tangy, deeply spiced fish curry made with Nellore's famous sea fish in a tamarind-chilli broth.",
                spice: 4, veg: false,
                img: "https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
                trivia: "Nellore is famous for its fish curry served in earthen pots that lend a unique mineral flavour.",
                vlogs: [
                    { title: "Authentic Nellore Fish Curry", author: "@CoastalEats", url: "https://www.youtube.com/results?search_query=nellore+chepala+pulusu", thumb: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400" }
                ],
                places: [
                    { id: "ap1", name: "Kritunga Restaurant", loc: "Visakhapatnam", lat: 17.7148, lng: 83.3246 },
                    { id: "ap2", name: "Hotel Dwaraka", loc: "Nellore", lat: 14.4426, lng: 79.9865 }
                ]
            },
            {
                name: "Pesarattu",
                desc: "Crispy green moong dal crepes served with ginger chutney — Andhra's answer to the dosa.",
                spice: 2, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "Pesarattu is a breakfast staple of Andhra. The 'MLA Pesarattu' served at state assembly canteens became legendary.",
                vlogs: [
                    { title: "Andhra Breakfast Deep Dive", author: "@TeluguFood", url: "https://www.youtube.com/results?search_query=pesarattu+andhra", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "ap3", name: "Hotel Minerva", loc: "Vijayawada", lat: 16.5062, lng: 80.6480 }
                ]
            }
        ]
    },
    "Tamil Nadu": {
        desc: "The ancient heartland of Dravidian cuisine, Chettinad spices, and banana-leaf feasts.",
        trivia: "A traditional Tamil 'sadhya' can include up to 64 different dishes served on a single banana leaf.",
        dishes: [
            {
                name: "Chettinad Chicken",
                desc: "A fierce complex blend of 18 roasted spices — kalpasi, marathi mokku, star anise — unique to the Chettinad community.",
                spice: 5, veg: false,
                img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
                trivia: "Chettinad masala uses spices not found in any other Indian cuisine, sourced by trading communities from Southeast Asia.",
                vlogs: [
                    { title: "Making Authentic Chettinad Masala", author: "@HeritageEats", url: "https://www.youtube.com/results?search_query=chettinad+chicken", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "tn1", name: "Ponnusamy Hotel", loc: "Chennai", lat: 13.0827, lng: 80.2707 },
                    { id: "tn2", name: "Anjappar", loc: "T Nagar, Chennai", lat: 13.0418, lng: 80.2341 }
                ]
            },
            {
                name: "Kuzhi Paniyaram",
                desc: "Pillowy dumplings made from fermented idli batter, cooked in a cast-iron kuzhi pan. Crispy outside, cloud-soft inside.",
                spice: 2, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "The kuzhi (hole) pan is made of iron or brass; old families pass it down as heirlooms.",
                vlogs: [
                    { title: "Grandma's Kuzhi Paniyaram", author: "@KaiyendiBhavan", url: "https://www.youtube.com/results?search_query=kuzhi+paniyaram", thumb: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400" }
                ],
                places: [
                    { id: "tn3", name: "Murugan Idli Shop", loc: "Madurai", lat: 9.9252, lng: 78.1198 }
                ]
            }
        ]
    },
    "Kerala": {
        desc: "The Malabar spice coast — coconut oil, curry leaves, and slow-cooked seafood stews.",
        trivia: "Kerala's Malabar coast was the original spice route that led Vasco da Gama and Columbus to attempt their journeys.",
        dishes: [
            {
                name: "Karimeen Pollichathu",
                desc: "Pearl spot fish marinated in red masala, wrapped in banana leaf, and grilled over coals. A toddy shop classic.",
                spice: 3, veg: false,
                img: "https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
                trivia: "Karimeen (pearl spot fish) is found only in Kerala's backwaters and is the state fish.",
                vlogs: [
                    { title: "Backwater Toddy Shop Food", author: "@KeralaFoodie", url: "https://www.youtube.com/results?search_query=karimeen+pollichathu", thumb: "https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400" }
                ],
                places: [
                    { id: "kl1", name: "Paragon Restaurant", loc: "Kozhikode", lat: 11.2588, lng: 75.7804 },
                    { id: "kl2", name: "Fusion Bay", loc: "Alleppey", lat: 9.4981, lng: 76.3388 }
                ]
            },
            {
                name: "Appam & Ishtu",
                desc: "Lacy fermented rice hoppers with a mild coconut milk and vegetable stew. Kerala's gentlest, most delicate meal.",
                spice: 1, veg: true,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "The lacy edges of appam are achieved by the fermentation of rice and coconut — no yeast, just time.",
                vlogs: [
                    { title: "Perfect Appam at Home", author: "@MalayalamKitchen", url: "https://www.youtube.com/results?search_query=appam+kerala", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "kl3", name: "Villa Maya", loc: "Thiruvananthapuram", lat: 8.5241, lng: 76.9366 }
                ]
            }
        ]
    },
    "Karnataka": {
        desc: "Home to ancient Udupi temple cuisine, Kodagu pork curries, and Dharwad's unique spice palette.",
        trivia: "Udupi cuisine was invented by the 13th-century saint-philosopher Madhvacharya. It is entirely vegetarian and has influenced dosa worldwide.",
        dishes: [
            {
                name: "Bisi Bele Bath",
                desc: "A steaming one-pot meal of rice, lentils, and vegetables in a tamarind-spice broth, topped with ghee.",
                spice: 3, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "Bisi Bele Bath ('hot lentil rice') originated in the kitchens of the Mysore Palace in the 17th century.",
                vlogs: [
                    { title: "Best Bisi Bele Bath in Bengaluru", author: "@OotaAytha", url: "https://www.youtube.com/results?search_query=bisi+bele+bath", thumb: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=400" }
                ],
                places: [
                    { id: "ka1", name: "MTR (Mavalli Tiffin Rooms)", loc: "Lalbagh, Bangalore", lat: 12.9510, lng: 77.5932 },
                    { id: "ka2", name: "Hotel Janatha", loc: "Malleshwaram, Bangalore", lat: 13.0034, lng: 77.5644 }
                ]
            },
            {
                name: "Coorg Pandi Curry",
                desc: "Kodava pork curry with kachampuli — a sour, smoky vinegar made from wild Coorg fruit.",
                spice: 4, veg: false,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "Kachampuli is an ingredient found only in Coorg. It cannot be replaced by any other souring agent.",
                vlogs: [
                    { title: "Coorg: India's Hidden Food Paradise", author: "@WildKitchenIndia", url: "https://www.youtube.com/results?search_query=coorg+pandi+curry", thumb: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400" }
                ],
                places: [
                    { id: "ka3", name: "Coorg Cuisine", loc: "Madikeri, Coorg", lat: 12.4244, lng: 75.7382 }
                ]
            }
        ]
    },
    "Maharashtra": {
        desc: "A city of street food dreams and coastal Konkan curries steeped in coconut.",
        trivia: "Vada Pav was invented in 1966 by Ashok Vaidya near Dadar station, Mumbai — as an affordable lunch for mill workers.",
        dishes: [
            {
                name: "Vada Pav",
                desc: "The legendary spiced potato dumpling inside a soft bun, smothered in chutneys. Mumbai's soul food.",
                spice: 4, veg: true,
                img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400",
                trivia: "Over 4 lakh vada pavs are consumed daily in Mumbai alone.",
                vlogs: [
                    { title: "Mumbai's Best Secret Vada Pav Stall", author: "@StreetFoodIndia", url: "https://www.youtube.com/results?search_query=mumbai+vada+pav", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "mh1", name: "Ashok Vada Pav", loc: "Dadar, Mumbai", lat: 19.0196, lng: 72.8428 }
                ]
            }
        ]
    },
    "Goa": {
        desc: "Where Portuguese colonial history fuses with Konkan spice and salt air.",
        trivia: "Goa's vinegar (toddy vinegar) is made from coconut palm fermentation — entirely different from any European vinegar.",
        dishes: [
            {
                name: "Goan Fish Curry",
                desc: "A kokum-infused coconut gravy with ladyfish or kingfish. Simple, bright, irreplaceable.",
                spice: 3, veg: false,
                img: "https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
                trivia: "Goan fish curry is eaten with rice for breakfast — a tradition from Portuguese colonial times.",
                vlogs: [
                    { title: "Traditional Goan Seafood Thali", author: "@GoaDiaries", url: "https://www.youtube.com/results?search_query=goan+fish+curry", thumb: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400" }
                ],
                places: [
                    { id: "ga1", name: "Ritz Classic", loc: "Panaji", lat: 15.4909, lng: 73.8278 }
                ]
            }
        ]
    },
    "Gujarat": {
        desc: "Sweet, salty, and sour — the vegetarian triumph of the Indian west.",
        trivia: "A Gujarati thali achieves a perfect balance of the six tastes (shadrasa): sweet, sour, salty, spicy, bitter, and astringent.",
        dishes: [
            {
                name: "Khaman Dhokla",
                desc: "Steamed, savory chickpea flour sponge — soft, tangy, topped with mustard seeds and coriander.",
                spice: 1, veg: true,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "Dhokla is fermented overnight, making it a probiotic-rich food. Ancient Ayurveda texts mention a similar dish.",
                vlogs: [
                    { title: "Ahmedabad Street Food Tour", author: "@GujjuEats", url: "https://www.youtube.com/results?search_query=khaman+dhokla", thumb: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400" }
                ],
                places: [
                    { id: "gj1", name: "Das Khaman", loc: "Ahmedabad", lat: 23.0225, lng: 72.5714 }
                ]
            }
        ]
    },
    "Rajasthan": {
        desc: "Desert cuisine — rich ghee, sun-dried ingredients, and warrior-era recipes.",
        trivia: "Laal Maas was originally made with wild boar hunted by Rajput warriors. The red colour comes from Mathania chillies.",
        dishes: [
            {
                name: "Laal Maas",
                desc: "A fiery, deep red mutton curry made with Mathania chillies and yoghurt — born in Rajput royal kitchens.",
                spice: 5, veg: false,
                img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
                trivia: "Mathania chillies are grown in a single village near Jodhpur. Nothing else produces the same depth of flavour.",
                vlogs: [
                    { title: "Fiery Rajputana Mutton Curry", author: "@RajwadiFlavors", url: "https://www.youtube.com/results?search_query=laal+maas", thumb: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400" }
                ],
                places: [
                    { id: "rj1", name: "Handi Restaurant", loc: "Jaipur", lat: 26.9124, lng: 75.7873 }
                ]
            }
        ]
    },
    "Punjab": {
        desc: "Tandoors, dairy, and the boldest buttered flavours in the country.",
        trivia: "The 'makhani' sauce (butter sauce) was invented accidentally in 1947 by Kundan Lal Gujral of Moti Mahal, Delhi.",
        dishes: [
            {
                name: "Butter Chicken",
                desc: "Tandoori chicken cooked in a creamy makhani gravy — gentle heat, deep richness, timeless.",
                spice: 2, veg: false,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "Butter Chicken was voted the most popular Indian dish globally in 2023.",
                vlogs: [
                    { title: "Dhaba Style Butter Chicken", author: "@PunjabiTadka", url: "https://www.youtube.com/results?search_query=punjabi+butter+chicken", thumb: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400" }
                ],
                places: [
                    { id: "pb1", name: "Kesar Da Dhaba", loc: "Amritsar", lat: 31.6340, lng: 74.8723 }
                ]
            }
        ]
    },
    "West Bengal": {
        desc: "Mustard oil, freshwater fish, and the world's finest sweets.",
        trivia: "Bengali sweets (mishti) use chhena (fresh cottage cheese) — a technique the Portuguese introduced in the 17th century.",
        dishes: [
            {
                name: "Kosha Mangsho",
                desc: "Slow-cooked mutton in a velvety, dark brown gravy — cooked until the oil separates and the meat falls off the bone.",
                spice: 3, veg: false,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "Kosha means 'to sauté slowly'. It can take up to 3 hours over a wood fire to properly kosha the mutton.",
                vlogs: [
                    { title: "Sunday Mutton Curry — Bengali Style", author: "@BongEats", url: "https://www.youtube.com/results?search_query=kosha+mangsho", thumb: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?q=80&w=400" }
                ],
                places: [
                    { id: "wb1", name: "Golbari", loc: "Shyambazar, Kolkata", lat: 22.5949, lng: 88.3683 }
                ]
            }
        ]
    },
    "Odisha": {
        desc: "Ancient temple food, banana flower curries, and the quietest genius in Indian cuisine.",
        trivia: "The Jagannath Temple in Puri feeds up to 10,000 people daily from its Mahaprasad kitchen — the world's largest temple kitchen.",
        dishes: [
            {
                name: "Dalma",
                desc: "Lentils cooked with raw papaya, raw banana, and yam — a temple-food staple of extraordinary simplicity.",
                spice: 1, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "Dalma was first cooked for Lord Jagannath 800 years ago and the recipe has never changed.",
                vlogs: [
                    { title: "Temple Food of Puri", author: "@KalingaKitchen", url: "https://www.youtube.com/results?search_query=odisha+dalma", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "od1", name: "Wildgrass Restaurant", loc: "Bhubaneswar", lat: 20.2961, lng: 85.8245 }
                ]
            }
        ]
    },
    "Assam": {
        desc: "Indigenous herbs, bamboo shoot, and tea that perfumes the entire Northeast.",
        trivia: "Assam's 'tenga' (sour) flavour profile is unique in Indian cooking — sourness from elephant apple, tomato, or lemon.",
        dishes: [
            {
                name: "Masor Tenga",
                desc: "A light, clean, and sour fish curry made with elephant apple or tomato. Assam's most beloved everyday dish.",
                spice: 2, veg: false,
                img: "https://images.unsplash.com/photo-1618449622950-8919630c7e2b?q=80&w=400",
                trivia: "Masor Tenga is Assam's national dish. The sourness is said to aid digestion in the humid, tropical climate.",
                vlogs: [
                    { title: "Cooking with Elephant Apple", author: "@NENorthEast", url: "https://www.youtube.com/results?search_query=masor+tenga", thumb: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400" }
                ],
                places: [
                    { id: "as1", name: "Paradise Restaurant", loc: "Guwahati", lat: 26.1445, lng: 91.7362 }
                ]
            }
        ]
    },
    "Bihar": {
        desc: "Rustic, earthy cuisine born in the Indo-Gangetic plains.",
        trivia: "Litti Chokha was the food of Bihari soldiers and farmers — it could be made over a dung fire and survived long journeys.",
        dishes: [
            {
                name: "Litti Chokha",
                desc: "Roasted wheat balls filled with sattu (roasted gram flour) served with smoky fire-roasted vegetable mash.",
                spice: 3, veg: true,
                img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400",
                trivia: "Litti can be stored for 3-4 days without refrigeration — making it perfect for travel in ancient India.",
                vlogs: [
                    { title: "Authentic Litti Chokha Making", author: "@DesiZaika", url: "https://www.youtube.com/results?search_query=litti+chokha", thumb: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=400" }
                ],
                places: [
                    { id: "bh1", name: "DK Litti Chokha", loc: "Patna", lat: 25.5941, lng: 85.1376 }
                ]
            }
        ]
    },
    "Uttar Pradesh": {
        desc: "Awadhi slow-cooking, kebabs, and the most refined flatbread culture in the world.",
        trivia: "The 'dum pukht' technique (sealed pressure cooking) was perfected in Lucknow's Nawabi kitchens in the 18th century.",
        dishes: [
            {
                name: "Tunday Kabab",
                desc: "Silky, melt-in-the-mouth galawat kebabs made with 160 spices — a secret recipe guarded for 170 years.",
                spice: 2, veg: false,
                img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
                trivia: "Haji Murad Ali (Tunday) invented the recipe for the toothless Nawab of Awadh in 1905. The 160-spice recipe is still secret.",
                vlogs: [
                    { title: "The Secret of Tunday Kabab", author: "@LucknowiBawarchi", url: "https://www.youtube.com/results?search_query=tunday+kabab+lucknow", thumb: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400" }
                ],
                places: [
                    { id: "up1", name: "Tunday Kababi", loc: "Aminabad, Lucknow", lat: 26.8467, lng: 80.9462 }
                ]
            }
        ]
    },
    "Madhya Pradesh": {
        desc: "Jungle spice, tribal flavours, and the original Malwa cuisine.",
        trivia: "Bhopal's Muslim cuisine and the Hindu tribal cuisines of MP exist side by side — two entirely different food worlds in one state.",
        dishes: [
            {
                name: "Poha Jalebi",
                desc: "Flattened rice flakes sautéed with turmeric, served alongside crispy, syrup-soaked jalebi spirals. MP's morning ritual.",
                spice: 1, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "Indore's poha-jalebi breakfast is considered the most iconic food pairing in Central India.",
                vlogs: [
                    { title: "Indore Food Trail — Poha Jalebi", author: "@MalwaEats", url: "https://www.youtube.com/results?search_query=indore+poha+jalebi", thumb: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400" }
                ],
                places: [
                    { id: "mp1", name: "Shree Bajrang Poha", loc: "Sarafa Bazaar, Indore", lat: 22.7193, lng: 75.8577 }
                ]
            }
        ]
    },
    "Himachal Pradesh": {
        desc: "Hill food — hearty, warming, and infused with mountain herbs and dairy.",
        trivia: "Sidu bread is leavened with wild yeast harvested from mountain wheat — a tradition thousands of years old.",
        dishes: [
            {
                name: "Dham",
                desc: "A ceremonial feast of rice, daal, rajma, and meethe chawal — served only by the Botis (Brahmin cooks) on special occasions.",
                spice: 2, veg: true,
                img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400",
                trivia: "Dham is cooked only in brass vessels and served on leaf plates (pattal). Using other materials is considered inauspicious.",
                vlogs: [
                    { title: "Himachali Dham — The Sacred Feast", author: "@HillFoodTrails", url: "https://www.youtube.com/results?search_query=himachali+dham+feast", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" }
                ],
                places: [
                    { id: "hp1", name: "The Dham Restaurant", loc: "Dharamsala", lat: 32.2190, lng: 76.3234 }
                ]
            }
        ]
    },
    "Jammu & Kashmir": {
        desc: "Wazwan feasts, saffron from Pampore, and the most regal of all Indian culinary traditions.",
        trivia: "A Kashmiri Wazwan feast consists of 36 courses served to guests seated in groups of four sharing a single large platter.",
        dishes: [
            {
                name: "Rogan Josh",
                desc: "Kashmiri lamb slow-cooked in a sauce coloured scarlet by Kashmiri chillies and maval flowers — not heat, but colour.",
                spice: 3, veg: false,
                img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=400",
                trivia: "The word 'Rogan' means clarified fat in Persian. The dish arrived in Kashmir with the Mughal Emperor Akbar.",
                vlogs: [
                    { title: "Wazwan — Kashmir's Royal Feast", author: "@ValleyFlavours", url: "https://www.youtube.com/results?search_query=kashmiri+rogan+josh", thumb: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=400" }
                ],
                places: [
                    { id: "jk1", name: "Ahdoos Hotel", loc: "Lal Chowk, Srinagar", lat: 34.0837, lng: 74.7973 }
                ]
            }
        ]
    }
};

// ============================================================
//  FILTER STATE
// ============================================================
let activeFilter = 'all';
let vegOnly = false;
let activeState = null;
let searchQuery = '';

const filterGroups = {
    all: Object.keys(db),
    south: SOUTH,
    north: ['Punjab','Uttar Pradesh','Rajasthan','Himachal Pradesh','Jammu & Kashmir','Madhya Pradesh','Bihar'],
    coastal: COASTAL,
    veg: Object.keys(db)
};

// ============================================================
//  MAP
// ============================================================
const map = L.map('yatraMap', {
    center: [20.5937, 78.9629],
    zoom: 5,
    zoomControl: false,
    attributionControl: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.control.zoom({ position: 'bottomright' }).addTo(map);

// Custom marker icon
function makeMarker(lat, lng, name, loc) {
    const icon = L.divIcon({
        className: '',
        html: `<div class="ayyo-marker"><div class="marker-pulse"></div><div class="marker-core"></div></div>`,
        iconSize: [44, 44], iconAnchor: [22, 22]
    });
    return L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`<div class="popup-name">${name}</div><div class="popup-loc"><i class="fa-solid fa-location-dot" style="color:var(--turmeric);margin-right:4px;"></i>${loc}</div>`);
}

let activeMarkers = [];
function clearMapMarkers() {
    activeMarkers.forEach(m => map.removeLayer(m));
    activeMarkers = [];
}

window.locate = function(lat, lng, name, loc) {
    clearMapMarkers();
    map.flyTo([lat, lng], 14, { duration: 1.5 });
    setTimeout(() => {
        const m = makeMarker(lat, lng, name, loc);
        activeMarkers.push(m);
        m.openPopup();
    }, 1200);
};

// ============================================================
//  YATRA
// ============================================================
let yatraData = [];
let yatraLine = null;
let yatraRouteMarkers = [];

function updateYatraBadge() {
    const badge = document.getElementById('yatraCountBadge');
    const num = document.getElementById('yatraCountNum');
    const sub = document.getElementById('yathraSub');
    num.textContent = yatraData.length;
    sub.textContent = `${yatraData.length} stop${yatraData.length !== 1 ? 's' : ''} planned`;
    badge.classList.toggle('has-stops', yatraData.length > 0);
}

window.addYatra = function(id, name, lat, lng) {
    if (yatraData.some(s => s.id === id)) {
        showToast('fa-solid fa-circle-info', `${name} already in your Yatra`, 'var(--coconut-dim)');
        return;
    }
    yatraData.push({ id, name, lat, lng });
    document.getElementById('yatraWidget').classList.add('active');
    renderYatraList();
    updateYatraBadge();

    const btn = document.getElementById(`addbtn-${id}`);
    if (btn) { btn.classList.add('added'); btn.innerHTML = '<i class="fa-solid fa-check"></i>'; }

    showToast('fa-solid fa-plus', `<b>${name}</b> added to Yatra`);
};

function renderYatraList() {
    const list = document.getElementById('yatraList');
    list.innerHTML = '';
    yatraData.forEach((stop, i) => {
        const li = document.createElement('li');
        li.className = 'yatra-stop-item';
        li.innerHTML = `<span class="stop-num">${i+1}</span><span class="stop-name">${stop.name}</span><button class="stop-remove" onclick="removeYatra('${stop.id}')" title="Remove"><i class="fa-solid fa-xmark"></i></button>`;
        list.appendChild(li);
    });
}

window.removeYatra = function(id) {
    yatraData = yatraData.filter(s => s.id !== id);
    renderYatraList();
    updateYatraBadge();
    const btn = document.getElementById(`addbtn-${id}`);
    if (btn) { btn.classList.remove('added'); btn.innerHTML = '<i class="fa-solid fa-plus"></i>'; }
    if (yatraData.length === 0) { document.getElementById('yatraWidget').classList.remove('active'); }
};

window.clearYatra = function() {
    yatraData.forEach(s => {
        const btn = document.getElementById(`addbtn-${s.id}`);
        if (btn) { btn.classList.remove('added'); btn.innerHTML = '<i class="fa-solid fa-plus"></i>'; }
    });
    yatraData = [];
    renderYatraList();
    updateYatraBadge();
    if (yatraLine) { map.removeLayer(yatraLine); yatraLine = null; }
    yatraRouteMarkers.forEach(m => map.removeLayer(m));
    yatraRouteMarkers = [];
    document.getElementById('yatraWidget').classList.remove('active');
    showToast('fa-solid fa-trash-can', 'Yatra cleared', 'var(--vermilion)');
};

window.drawRoute = function() {
    if (yatraData.length < 2) {
        showToast('fa-solid fa-triangle-exclamation', 'Add at least 2 stops to map the route', 'var(--vermilion)');
        return;
    }
    if (yatraLine) map.removeLayer(yatraLine);
    yatraRouteMarkers.forEach(m => map.removeLayer(m));
    clearMapMarkers();

    const latlngs = yatraData.map(s => [s.lat, s.lng]);
    yatraLine = L.polyline(latlngs, { color: '#E8A020', weight: 3, opacity: 0.8, dashArray: '8 8' }).addTo(map);

    yatraData.forEach((stop, i) => {
        const icon = L.divIcon({
            className: '',
            html: `<div class="route-marker-dot">${i+1}</div>`,
            iconSize: [28, 28], iconAnchor: [14, 14]
        });
        const m = L.marker([stop.lat, stop.lng], { icon }).addTo(map).bindPopup(`<div class="popup-name">${stop.name}</div>`);
        yatraRouteMarkers.push(m);
    });

    map.fitBounds(yatraLine.getBounds(), { padding: [60, 60], duration: 1.5 });
    showToast('fa-solid fa-route', `Route mapped — ${yatraData.length} stops`);
};

// ============================================================
//  RENDER
// ============================================================
function spicePips(level) {
    let html = '<div class="spice-pips">';
    for (let i = 1; i <= 5; i++) {
        html += `<div class="spice-pip${i<=level ? (level>=4?' on hot':' on') : ''}"></div>`;
    }
    return html + '</div>';
}

function renderResults(stateName) {
    activeState = stateName;
    const data = db[stateName];
    if (!data) return;

    const container = document.getElementById('results-container');
    const isSouth = SOUTH.includes(stateName);

    // Update map label
    document.getElementById('mapStateName').textContent = stateName;

    // Update nav spice meter based on avg spice
    const avgSpice = Math.round(data.dishes.reduce((a,d) => a + d.spice, 0) / data.dishes.length);
    updateSpiceMeter(avgSpice);

    // Fly map
    if (data.dishes[0] && data.dishes[0].places[0]) {
        const p = data.dishes[0].places[0];
        map.flyTo([p.lat, p.lng], 7, { duration: 1.5 });
    }

    // Build HTML
    let html = `
        <div class="region-intro">
            <div class="region-tag">${isSouth ? '⭐ SOUTH INDIA' : 'INDIA'} · ${stateName.toUpperCase()}</div>
            <div class="region-name">${stateName}</div>
            <p class="region-desc">${data.desc}</p>
        </div>`;

    if (data.trivia) {
        html += `<div class="trivia-box">${data.trivia}</div>`;
    }

    const dishes = vegOnly 
        ? data.dishes.filter(d => d.veg)
        : data.dishes;

    if (dishes.length === 0) {
        html += `<div class="empty-state" style="padding:2rem"><p class="empty-title" style="font-size:1.2rem">No veg dishes here</p><p class="empty-sub">Try disabling the veg filter</p></div>`;
    }

    dishes.forEach((dish, dishIndex) => {
        // Vlogs
        let vlogsHTML = `<div class="section-subtitle"><i class="fa-brands fa-youtube"></i> Creator Vlogs</div><div class="vlog-carousel">`;
        dish.vlogs.forEach(v => {
            vlogsHTML += `<a href="${v.url}" target="_blank" class="vlog-card" onclick="event.stopPropagation()">
                <img src="${v.thumb}" alt="${v.title}" class="vlog-thumb" loading="lazy">
                <div class="vlog-overlay">
                    <div class="vlog-title">${v.title}</div>
                    <div class="vlog-author">${v.author}</div>
                </div>
                <div class="play-btn"><i class="fa-solid fa-circle-play"></i></div>
            </a>`;
        });
        vlogsHTML += `</div>`;

        // Places
        let placesHTML = `<div class="section-subtitle"><i class="fa-solid fa-map-pin"></i> Legendary Spots</div>`;
        dish.places.forEach(place => {
            placesHTML += `
                <div class="place-card">
                    <div class="place-info">
                        <h5>${place.name}</h5>
                        <div class="place-loc"><i class="fa-solid fa-location-dot"></i>${place.loc}</div>
                    </div>
                    <div class="place-actions">
                        <button class="place-btn" title="Locate on map" onclick="locate(${place.lat}, ${place.lng}, '${place.name}', '${place.loc}'); event.stopPropagation();">
                            <i class="fa-solid fa-crosshairs"></i>
                        </button>
                        <button class="place-btn add" id="addbtn-${place.id}" title="Add to Yatra" 
                            onclick="addYatra('${place.id}', '${place.name}', ${place.lat}, ${place.lng}); event.stopPropagation();">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>`;
        });

        // Trivia
        const triviaHTML = dish.trivia 
            ? `<div class="section-subtitle" style="margin-top:1rem"><i class="fa-solid fa-scroll"></i> Did You Know</div><div class="trivia-box" style="margin:0 0 0.5rem">${dish.trivia}</div>`
            : '';

        // Badges
        const spiceBadge = `<span class="badge badge-spice">${spicePips(dish.spice)} Spice ${dish.spice}/5</span>`;
        const vegBadge = dish.veg 
            ? `<span class="badge badge-veg"><i class="fa-solid fa-leaf"></i> Pure Veg</span>`
            : `<span class="badge badge-nonveg"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg</span>`;
        const hotBadge = dish.spice >= 4 ? `<span class="badge badge-hot"><i class="fa-solid fa-fire"></i> Fiery</span>` : '';

        html += `
            <div class="dish-card" data-state="${stateName}" data-dish="${dishIndex}" onclick="handleDishTap(this, event)">
                <div class="dish-header">
                    <div class="dish-img-wrap">
                        <img src="${dish.img}" alt="${dish.name}" class="dish-img" loading="lazy">
                        <div class="dish-img-overlay"></div>
                    </div>
                    <div class="dish-info">
                        <div class="dish-name">${dish.name}</div>
                        <p class="dish-desc">${dish.desc}</p>
                        <div class="badges">${spiceBadge}${vegBadge}${hotBadge}</div>
                    </div>
                    <i class="fa-solid fa-chevron-down chevron desktop-only"></i>
                    <i class="fa-solid fa-arrow-up-right-from-square mobile-expand" style="color:rgba(245,237,216,0.2);font-size:0.85rem;flex-shrink:0;"></i>
                </div>
                <div class="expanded-content desktop-expand">
                    <div class="expanded-inner">
                        ${triviaHTML}
                        ${vlogsHTML}
                        ${placesHTML}
                    </div>
                </div>
            </div>`;
    });

    container.innerHTML = html;

    // Re-apply added state for yatra buttons
    yatraData.forEach(stop => {
        const btn = document.getElementById(`addbtn-${stop.id}`);
        if (btn) { btn.classList.add('added'); btn.innerHTML = '<i class="fa-solid fa-check"></i>'; }
    });

    // On mobile: auto-open the panel when results are rendered
    if (window.innerWidth <= 900 && !panelOpen) {
        panelOpen = true;
        discoveryPanel.classList.add('open');
        if (panelToggleBtn) {
            panelToggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i><span>Close</span>';
        }
    }

    // Animate in
    container.style.opacity = '0';
    container.style.transform = 'translateY(15px)';
    setTimeout(() => {
        container.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 50);
}

window.handleDishTap = function(card, event) {
    if (event.target.closest('.place-actions') || event.target.closest('.vlog-card') || event.target.closest('a')) return;
    // On mobile (≤900px) → open the modal sheet
    if (window.innerWidth <= 900) {
        const stateName = card.dataset.state;
        const dishIndex = parseInt(card.dataset.dish);
        openModal(stateName, dishIndex);
        return;
    }
    // On desktop → inline expand
    document.querySelectorAll('.dish-card').forEach(c => { if (c !== card) c.classList.remove('open'); });
    card.classList.toggle('open');
};

window.toggleCard = window.handleDishTap;

// ============================================================
//  SPICE METER
// ============================================================
function updateSpiceMeter(level) {
    const dots = document.querySelectorAll('.sm-dot');
    dots.forEach((d, i) => {
        d.className = 'sm-dot';
        if (i < level) {
            d.classList.add(level >= 4 ? 'hot' : 'active');
        }
    });
}

// ============================================================
//  STATE CAROUSEL
// ============================================================
function buildCarousel(states) {
    const carousel = document.getElementById('stateCarousel');
    carousel.innerHTML = '';
    states.forEach(name => {
        const chip = document.createElement('button');
        chip.className = 'state-chip' + (SOUTH.includes(name) ? ' south' : '');
        chip.textContent = name;
        if (name === activeState) chip.classList.add('active');
        chip.onclick = () => {
            document.querySelectorAll('.state-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderResults(name);
        };
        carousel.appendChild(chip);
    });
}

// ============================================================
//  FILTERS
// ============================================================
window.setFilter = function(filter, btn) {
    activeFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    let states = filterGroups[filter] || Object.keys(db);
    if (filter === 'veg') {
        states = Object.keys(db).filter(s => db[s].dishes.some(d => d.veg));
        vegOnly = true;
    } else {
        vegOnly = false;
    }
    buildCarousel(states);
    if (activeState && states.includes(activeState)) renderResults(activeState);
    else if (activeState) {
        activeState = null;
        document.getElementById('results-container').innerHTML = `<div class="empty-state"><div class="empty-kolam"><div class="ek-ring ek-1"></div><div class="ek-ring ek-2"></div><div class="ek-ring ek-3"></div><div class="ek-center">🗺️</div></div><p class="empty-title">Map the Flavours</p><p class="empty-sub">Search or select a state to begin your culinary pilgrimage</p></div>`;
    }
};

window.toggleVegFilter = function() {
    vegOnly = !vegOnly;
    document.getElementById('filterVegBtn').classList.toggle('active', vegOnly);
    if (activeState) renderResults(activeState);
};

// ============================================================
//  SEARCH
// ============================================================
const searchInput = document.getElementById('stateSearchInput');
const searchClear = document.getElementById('searchClear');

searchInput.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    searchQuery = q;
    searchClear.classList.toggle('visible', q.length > 0);

    if (q.length === 0) {
        buildCarousel(filterGroups[activeFilter] || Object.keys(db));
        return;
    }

    const matched = Object.keys(db).filter(name => {
        if (name.toLowerCase().includes(q)) return true;
        return db[name].dishes.some(d => 
            d.name.toLowerCase().includes(q) || 
            d.desc.toLowerCase().includes(q) ||
            (d.trivia && d.trivia.toLowerCase().includes(q))
        );
    });

    buildCarousel(matched);

    if (matched.length === 1) {
        renderResults(matched[0]);
    } else if (matched.length > 0) {
        // Show matching dishes across states
        showSearchResults(q, matched);
    }
});

window.clearSearch = function() {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.remove('visible');
    buildCarousel(filterGroups[activeFilter] || Object.keys(db));
};

function showSearchResults(q, states) {
    if (states.length === 0) return;
    // Just show the first match
    if (states.includes(activeState)) return;
    renderResults(states[0]);
    document.querySelectorAll('.state-chip').forEach(c => {
        if (c.textContent === states[0]) c.classList.add('active');
    });
}

// ============================================================
//  DISH DETAIL MODAL
// ============================================================
const modalOverlay = document.getElementById('modalOverlay');

function openModal(stateName, dishIndex) {
    const dish = db[stateName].dishes[dishIndex];
    if (!dish) return;

    const spicePipsHtml = (() => {
        let h = '<div class="spice-pips" style="display:flex;gap:3px">';
        for (let i=1;i<=5;i++) h+=`<div class="spice-pip${i<=dish.spice?(dish.spice>=4?' on hot':' on'):''}"></div>`;
        return h+'</div>';
    })();

    const vegBadge = dish.veg
        ? `<span class="badge badge-veg"><i class="fa-solid fa-leaf"></i> Pure Veg</span>`
        : `<span class="badge badge-nonveg"><i class="fa-solid fa-drumstick-bite"></i> Non-Veg</span>`;
    const hotBadge = dish.spice>=4 ? `<span class="badge badge-hot"><i class="fa-solid fa-fire"></i> Fiery</span>` : '';

    let vlogsHtml = '';
    dish.vlogs.forEach(v => {
        vlogsHtml += `<a href="${v.url}" target="_blank" class="vlog-card" style="min-width:170px">
            <img src="${v.thumb}" alt="${v.title}" class="vlog-thumb" loading="lazy">
            <div class="vlog-overlay">
                <div class="vlog-title">${v.title}</div>
                <div class="vlog-author">${v.author}</div>
            </div>
            <div class="play-btn"><i class="fa-solid fa-circle-play"></i></div>
        </a>`;
    });

    let placesHtml = '';
    dish.places.forEach(p => {
        placesHtml += `<div class="place-card">
            <div class="place-info">
                <h5>${p.name}</h5>
                <div class="place-loc"><i class="fa-solid fa-location-dot"></i>${p.loc}</div>
            </div>
            <div class="place-actions">
                <button class="place-btn" onclick="locate(${p.lat},${p.lng},'${p.name}','${p.loc}');closeModal();" title="Locate">
                    <i class="fa-solid fa-crosshairs"></i>
                </button>
                <button class="place-btn add" id="modal-addbtn-${p.id}" onclick="addYatra('${p.id}','${p.name}',${p.lat},${p.lng});syncModalYatraBtn('${p.id}');" title="Add to Yatra">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>`;
    });

    document.getElementById('modalContent').innerHTML = `
        <img src="${dish.img}" alt="${dish.name}" class="modal-hero-img" loading="lazy">
        <div class="modal-body">
            <div class="modal-eyebrow"><i class="fa-solid fa-location-dot"></i> ${stateName}</div>
            <h2 class="modal-title">${dish.name}</h2>
            <p class="modal-desc">${dish.desc}</p>
            <div class="modal-badges">
                <span class="badge badge-spice">${spicePipsHtml} Spice ${dish.spice}/5</span>
                ${vegBadge}${hotBadge}
            </div>
            ${dish.trivia ? `<div class="modal-trivia">${dish.trivia}</div>` : ''}
            <div class="modal-section-title"><i class="fa-brands fa-youtube"></i> Creator Vlogs</div>
            <div class="vlog-carousel">${vlogsHtml}</div>
            <div class="modal-section-title"><i class="fa-solid fa-map-pin"></i> Where to Eat</div>
            ${placesHtml}
            <div class="modal-actions">
                <button class="modal-btn-primary" onclick="addFirstPlace_${dishIndex}()">
                    <i class="fa-solid fa-plus"></i> Add to Yatra
                </button>
                <button class="modal-btn-ghost" onclick="shareModal('${dish.name}','${stateName}')">
                    <i class="fa-solid fa-share-nodes"></i> Share
                </button>
                <button class="modal-btn-ghost" onclick="closeModal()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>`;

    // Inline function for adding first place
    window[`addFirstPlace_${dishIndex}`] = () => {
        const p = dish.places[0];
        addYatra(p.id, p.name, p.lat, p.lng);
        syncModalYatraBtn(p.id);
    };

    // Sync already-added yatra buttons inside modal
    yatraData.forEach(stop => {
        const btn = document.getElementById(`modal-addbtn-${stop.id}`);
        if (btn) { btn.classList.add('added'); btn.innerHTML = '<i class="fa-solid fa-check"></i>'; }
    });

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Touch swipe down to close
    let mTouchY = 0;
    const sheet = document.getElementById('modalSheet');
    sheet.addEventListener('touchstart', e => { mTouchY = e.touches[0].clientY; }, { passive: true, once: false });
    sheet.ontouchend = e => {
        if (e.changedTouches[0].clientY - mTouchY > 80) closeModal();
    };
}

window.closeModal = function() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
};

window.syncModalYatraBtn = function(id) {
    const btn = document.getElementById(`modal-addbtn-${id}`);
    if (btn) { btn.classList.add('added'); btn.innerHTML = '<i class="fa-solid fa-check"></i>'; }
};

window.shareModal = function(dishName, stateName) {
    const text = `🍛 ${dishName} — from ${stateName}. Discover it on AYYO, the Pan-Indian Culinary Atlas!`;
    if (navigator.share) {
        navigator.share({ title: dishName, text });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            showToast('fa-solid fa-check', 'Copied to clipboard!');
        });
    }
};

// ============================================================
//  SURPRISE ME
// ============================================================
window.surpriseMe = function() {
    const states = Object.keys(db);
    const randState = states[Math.floor(Math.random() * states.length)];
    const dishes = db[randState].dishes;
    const randDish = Math.floor(Math.random() * dishes.length);

    // Flash the button
    const btn = document.querySelector('[onclick="surpriseMe()"]');
    if (btn) { btn.classList.add('surprise-flash'); setTimeout(()=>btn.classList.remove('surprise-flash'),600); }

    // Navigate to state
    renderResults(randState);
    document.querySelectorAll('.state-chip').forEach(c => {
        c.classList.toggle('active', c.textContent === randState);
    });

    // Open the dish modal after a brief delay
    setTimeout(() => openModal(randState, randDish), 400);

    showToast('fa-solid fa-shuffle', `Surprise! <b>${dishes[randDish].name}</b> from ${randState}`);
};

// ============================================================
//  YATRA WIDGET NAV TOGGLE
// ============================================================
window.toggleYatraWidget = function() {
    const w = document.getElementById('yatraWidget');
    if (yatraData.length === 0) {
        showToast('fa-solid fa-route', 'Add stops to start your Yatra', 'var(--coconut-dim)');
        return;
    }
    w.classList.toggle('active');
};

// ============================================================
//  MOBILE PANEL TOGGLE + SWIPE TO CLOSE
// ============================================================
let panelOpen = false;
const discoveryPanel = document.getElementById('discoveryPanel');
const panelToggleBtn = document.getElementById('panelToggleBtn');

window.togglePanel = function() {
    panelOpen = !panelOpen;
    discoveryPanel.classList.toggle('open', panelOpen);
    if (panelToggleBtn) {
        panelToggleBtn.innerHTML = panelOpen
            ? '<i class="fa-solid fa-xmark"></i><span>Close</span>'
            : '<i class="fa-solid fa-magnifying-glass"></i><span>Explore Dishes</span>';
    }
};

// Swipe down to close panel on mobile
let touchStartY = 0;
discoveryPanel.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });
discoveryPanel.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (dy > 60) {
        panelOpen = false;
        discoveryPanel.classList.remove('open');
        if (panelToggleBtn) {
            panelToggleBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><span>Explore Dishes</span>';
        }
    }
}, { passive: true });

// Close panel when tapping map on mobile
document.getElementById('yatraMap').addEventListener('click', () => {
    if (window.innerWidth <= 900 && panelOpen) {
        panelOpen = false;
        discoveryPanel.classList.remove('open');
        if (panelToggleBtn) {
            panelToggleBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i><span>Explore Dishes</span>';
        }
    }
});

// ============================================================
//  INIT
// ============================================================
buildCarousel(Object.keys(db));
updateYatraBadge();
