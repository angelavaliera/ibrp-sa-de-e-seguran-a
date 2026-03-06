import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail } from "lucide-react";
import type { GuestAuthor } from "@/lib/blog-types";

interface AuthorBioProps {
  author: GuestAuthor;
}

const AuthorBio = ({ author }: AuthorBioProps) => {
  const hasLinks = author.linkedin || author.instagram || author.email;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 rounded-2xl bg-muted/50 border border-border p-6 md:p-8"
    >
      <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-5">
        Sobre o autor
      </p>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Photo */}
        {author.photo && (
          <img
            src={author.photo}
            alt={author.name}
            className="w-[7.5rem] h-[7.5rem] rounded-full object-cover flex-shrink-0"
          />
        )}

        {/* Info */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-heading font-bold text-foreground mb-1">
            {author.name}
          </h4>

          {author.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {author.bio}
            </p>
          )}

          {hasLinks && (
            <div className="flex items-center justify-center sm:justify-start gap-3">
              {author.linkedin && (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
              )}
              {author.instagram && (
                <a
                  href={author.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
              )}
              {author.email && (
                <a
                  href={`mailto:${author.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="E-mail"
                >
                  <Mail className="h-4.5 w-4.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorBio;
