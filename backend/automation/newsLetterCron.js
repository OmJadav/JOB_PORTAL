import cron from 'node-cron'
import Job from '../models/jobSchema.js'
import User from '../models/userSchema.js'
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js'
import { sendEmail } from '../utils/sendEmail.js'
import ErrorHandler from '../middlewares/errorMiddleware.js'

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Email Sent ✅");
        const jobs = await Job.find({ newsLettersSent: false });
        if (jobs.length === 0) {
            console.log("No new jobs to process for newsletters.");
            return;
        }
        for (const job of jobs) {
            try {
                const filteredUser = await User.find({
                    $or: [
                        { "niches.firstNiche": job.jobNiche },
                        { "niches.secondNiche": job.jobNiche },
                        { "niches.thirdNiche": job.jobNiche },
                    ]
                });
                for (const user of filteredUser) {
                    const subject = `Exciting Job Opportunity in ${job.jobNiche} Preferred Niche!`;
                    const message = `
                      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #007bff;">Dear ${user.name},</h2>
                        
                        <p>We hope you're doing well!</p>

                        <p>We are excited to inform you about a new job opportunity that matches your interests in <strong>${job.jobNiche}</strong>. This role could be the perfect next step in your career journey.</p>

                        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Position:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${job.title}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${job.companyName}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Location:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${job.location}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Salary Range:</strong></td>
                            <td style="padding: 8px; border: 1px solid #ddd;">${job.salary}</td>
                          </tr>
                        </table>

                        <p>To learn more about this company, please visit the following link:</p>
                        <p><a href="${job.personalWebsite}" style="color: #007bff; text-decoration: none;">View Company Details </a></p>

                        <p>Don't miss out on this chance to advance your career in a field you're passionate about. We encourage you to apply soon, as positions like this are highly sought after.</p>

                        <p>Best regards,<br/> Team CareerLink</p>

                        <p style="font-size: 12px; color: #888;">P.S. Make sure to update your profile to receive more tailored job alerts!</p>
                      </div>
                    `;
                    sendEmail({
                        email: user.email,
                        subject,
                        message
                    });
                }
                job.newsLettersSent = true;
                await job.save();
            } catch (error) {
                console.log("Error in nodecron ");
                return next(ErrorHandler("INTERNAL SERVER ERROR", 505));
            }
        }
    });
};

