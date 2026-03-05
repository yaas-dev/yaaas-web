import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env');
    process.exit(1);
}

// Talent Schema
const TalentSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, enum: ['VISUAL', 'SONIC'], required: true },
    headshot: { type: String, required: true },
    bio: [{ type: String }],
    socials: {
        x: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
        website: { type: String },
    },
}, { timestamps: true });

// Artwork Schema
const ArtworkSchema = new mongoose.Schema({
    src: { type: String, required: true },
    artistName: { type: String, required: true },
    talentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Talent', required: true },
    title: { type: String, required: true },
}, { timestamps: true });

// Project Schema
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    mainImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    date: { type: String },
    details: [{ type: String }],
}, { timestamps: true });

// News Schema
const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    contentBlurb: { type: String, required: true },
    fullContent: { type: String, required: true },
    category: { type: String, default: 'NEWS' },
}, { timestamps: true });

// Collaboration Schema
const CollaborationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
}, { timestamps: true });

const Talent = mongoose.models.Talent || mongoose.model('Talent', TalentSchema);
const Artwork = mongoose.models.Artwork || mongoose.model('Artwork', ArtworkSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const News = mongoose.models.News || mongoose.model('News', NewsSchema);
const Collaboration = mongoose.models.Collaboration || mongoose.model('Collaboration', CollaborationSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Talent.deleteMany({});
        await Artwork.deleteMany({});
        await Project.deleteMany({});
        await News.deleteMany({});
        await Collaboration.deleteMany({});
        console.log('Cleared existing data');

        // ... (Talents, Artworks, Projects, News seeding logic stays same)
        // [NOTE: Abbreviating for the replace_file_content tool, but ensuring it's correct in the final file]

        // ... (I'll just provide the full content for the insertion part below to be safe)

        // Create Talents
        const talents = await Talent.insertMany([
            {
                name: "EOLIA",
                slug: "eolia",
                type: "[ THE VISUAL ]",
                category: "VISUAL",
                headshot: "https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=800",
                bio: [
                    "Eolia is a multidisciplinary visual artist whose work explores the intersections of digital identity and ancestral memory.",
                    "Based between Accra and London, her practice spans digital collage, augmented reality, and traditional oil painting."
                ],
                socials: { instagram: "https://instagram.com/eolia", website: "https://eolia.art" }
            },
            {
                name: "MALIK",
                slug: "malik",
                type: "[ THE SONIC ]",
                category: "SONIC",
                headshot: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
                bio: [
                    "Malik is a sound architect and producer focused on the evolution of Afrobeats and experimental electronic music.",
                    "His compositions often incorporate field recordings from bustling West African markets layered with deep, resonant basslines."
                ],
                socials: { instagram: "https://instagram.com/malik_sounds", x: "https://x.com/malik" }
            }
        ]);
        console.log('Seeded Talents');

        // Create Artworks
        await Artwork.insertMany([
            {
                title: "Fragmented Reality I",
                artistName: "EOLIA",
                talentId: talents[0]._id,
                src: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Sonic Resonance",
                artistName: "MALIK",
                talentId: talents[1]._id,
                src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Ancestral Glitch",
                artistName: "EOLIA",
                talentId: talents[0]._id,
                src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Urban Echoes",
                artistName: "MALIK",
                talentId: talents[1]._id,
                src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Digital Diaspora",
                artistName: "EOLIA",
                talentId: talents[0]._id,
                src: "https://images.unsplash.com/photo-1515405299443-f716751261a4?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Neo-Traditional",
                artistName: "EOLIA",
                talentId: talents[0]._id,
                src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800"
            },
            {
                title: "Future Rhythms",
                artistName: "MALIK",
                talentId: talents[1]._id,
                src: "https://images.unsplash.com/photo-1504173010664-32509aaec330?auto=format&fit=crop&q=80&w=800"
            }
        ]);
        console.log('Seeded Artworks');

        // Create Projects
        await Project.insertMany([
            {
                title: "CULTURAL BRIDGE 2024",
                category: "BRANDING / EXPERIENTIAL",
                description: "An immersive exhibition connecting Lagosian tech innovators with traditional artisans through a series of interactive physical workshops. The project explored how ancestral craftsmanship can inform modern digital design systems, creating a unique aesthetic that bridges centuries of tradition with tomorrow's technology.",
                date: "MARCH 2024",
                details: [
                    "Curated 12 traditional Yoruba artisans",
                    "Developed proprietary AI-driven design tools",
                    "Featured in Architectural Digest & Hypebeast",
                    "3-week residency in Lagos Island"
                ],
                mainImage: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200",
                galleryImages: [
                    "https://images.unsplash.com/photo-1510664460563-f5493fbd2455?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800"
                ]
            },
            {
                title: "SONIC LANDSCAPES",
                category: "SOUND DESIGN",
                description: "A permanent sound installation at the Accra Arts Center, featuring 24-channel spatial audio that reacts to visitor movement. Using a blend of field recordings and synthetic textures, the piece creates an ever-evolving atmosphere that reflects the heart of the city.",
                date: "JANUARY 2024",
                details: [
                    "24-channel spatial audio array",
                    "Reactive movement sensors",
                    "Permanent installation in Accra",
                    "Soundtrack released on vinyl"
                ],
                mainImage: "https://images.unsplash.com/photo-1514320298322-25f0a4a47d01?auto=format&fit=crop&q=80&w=1200",
                galleryImages: []
            }
        ]);
        console.log('Seeded Projects');

        // Create News
        await News.insertMany([
            {
                title: "YAAAS Agency to Partner with Brooklyn Museum",
                date: "15 MAR 2024",
                image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
                category: "EXHIBITION",
                contentBlurb: "We are thrilled to announce a year-long partnership focusing on contemporary African art surveys.",
                fullContent: "The Brooklyn Museum and YAAAS Agency are joining forces to curate a series of exhibitions showcasing the vanguard of West African creativity. \n\nStarting this Fall, the partnership will kick off with 'Digital Ancestry', an exhibit exploring how emerging talents are using new technologies to preserve traditional heritage. This initiative aims to bridge the gap between continental artists and the global diaspora."
            },
            {
                title: "Malik Wins Best Experimental Audio Award",
                date: "02 FEB 2024",
                image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
                category: "AWARDS",
                contentBlurb: "Celebrating a major milestone for our sonic artist Malik in the electronic music scene.",
                fullContent: "The Global Audio Collective has recognized Malik for his groundbreaking work in 'Urban Echoes'. The album was cited for its innovative use of field recordings and complex polyrhythmic structures. \n\nMalik continues to push the boundaries of what Afrobeats can be, blending it seamlessly with ambient and noise music."
            }
        ]);
        console.log('Seeded News');

        // Create Collaborations
        await Collaboration.insertMany([
            {
                title: "1954 OBMUN Art Experience",
                description: "The Yaaas Asantewaa Agency was honoured to take part in the creation of the 1954 OBMUN Art Experience alongside Africana Room. We lead our contributions with resources including sourcing 10 artists from across the continent, implementing the execution process, and ensuring successful integration. The project is an ongoing exploration into pan-african representations, museums, curating studies, and conceptual curation. The 1954 OBMUN Art Experience is a travelling gallery that aims to bridge the gap between visual arts and academia, showcasing in Accra, London, Lagos, and other major cities.\n\nThis project served as a means of democratizing the art world, making it more accessible to a broader audience and breaking down barriers to comprehensive and coherent paths. The recognition of international media outlets such as CNN, Rolling Stones, and The Guardian is a testament to the project's success in generating a buzz. The 1954 OBMUN showroom stood out amidst a heavily dominated industry and was recognized as one of the game-changing albums of 2023.",
                images: [
                    "https://images.unsplash.com/photo-1492691523567-3073d6193af7?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1554941068-a252680d25d9?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1510664460563-f5493fbd2455?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=800"
                ]
            },
            {
                title: "AFRICANA ROOM: GLOBAL DIASPORA",
                description: "A collaborative residency program designed to foster dialogue between continental African artists and those in the diaspora. This series of workshops and exhibitions explores the concept of 'home' in a globalized world, using visual art as a universal language to connect disparate experiences.",
                images: [
                    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=800"
                ]
            }
        ]);
        console.log('Seeded Collaborations');

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
