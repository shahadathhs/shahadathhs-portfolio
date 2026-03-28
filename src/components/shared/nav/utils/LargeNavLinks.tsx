import { ActiveLink } from '@/components/shared/nav/utils/ActiveLink';
import { NAV_SECTION_IDS_ORDERED, navLinks } from '@/constant/navigationLinks';
import { useActiveSection } from '@/hooks/use-active-section';

export const LargeNavLinks = () => {
  const activeSection = useActiveSection(NAV_SECTION_IDS_ORDERED);

  return (
    <div className="flex items-center space-x-2 lg:space-x-3 mr-3">
      {navLinks.map((link) => (
        <ActiveLink
          key={link.link}
          href={link.link}
          isActive={activeSection === link.link}
        >
          {link.title}
        </ActiveLink>
      ))}
    </div>
  );
};
