import Link from 'next/link';

interface HeaderButtonProps {
  title: string;
  href?: string;
  onClick?: () => void;
}

export function HeaderButton({ title, href, onClick }: HeaderButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className="shrink-0 whitespace-nowrap px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white text-sm sm:text-lg font-display font-semibold rounded-2xl cursor-pointer text-center"
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 whitespace-nowrap w-20 sm:w-30 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white text-sm sm:text-lg font-display font-semibold rounded-2xl cursor-pointer text-center"
    >
      {title}
    </button>
  );
}
