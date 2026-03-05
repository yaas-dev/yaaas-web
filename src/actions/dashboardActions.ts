'use server';

import dbConnect from '@/lib/mongodb';
import Talent from '@/models/Talent';
import Artwork from '@/models/Artwork';
import Project from '@/models/Project';
import Collaboration from '@/models/Collaboration';
import News from '@/models/News';
import Enquiry from '@/models/Enquiry';

export async function getDashboardStats() {
    try {
        await dbConnect();

        const [
            talentCount,
            artworkCount,
            projectCount,
            collaborationCount,
            newsCount,
            enquiryCount,
            newEnquiryCount
        ] = await Promise.all([
            Talent.countDocuments(),
            Artwork.countDocuments(),
            Project.countDocuments(),
            Collaboration.countDocuments(),
            News.countDocuments(),
            Enquiry.countDocuments(),
            Enquiry.countDocuments({ status: 'NEW' })
        ]);

        return {
            talents: talentCount,
            artworks: artworkCount,
            projects: projectCount,
            collaborations: collaborationCount,
            news: newsCount,
            enquiries: enquiryCount,
            newEnquiries: newEnquiryCount
        };
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
            talents: 0,
            artworks: 0,
            projects: 0,
            collaborations: 0,
            news: 0,
            enquiries: 0,
            newEnquiries: 0
        };
    }
}
