import { Plus } from 'lucide-react';
import type { FaqItem } from '../content/faq';

/** Native <details> accordion: keyboard and screen-reader friendly with no extra script. */
export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="faq">
      {items.map(item => (
        <details key={item.q}>
          <summary>
            {item.q}
            <Plus size={20} aria-hidden="true" />
          </summary>
          <p className="answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
