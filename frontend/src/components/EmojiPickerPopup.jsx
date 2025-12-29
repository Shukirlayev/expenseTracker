import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Outside click yopish
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-col md:flex-row items-center gap-5 mb-6"
    >
      {/* Trigger */}
      <div
        className="flex items-center gap-4 cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center justify-center w-12 h-12 text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-10 h-10" />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="text-sm font-medium">
          {icon ? 'Change Icon' : 'Pick Icon'}
        </p>
      </div>

      {/* Emoji Picker */}
      {isOpen && (
        <div className="absolute top-full mt-3 left-0 z-50 shadow-xl">
          <div className="relative overflow-visible">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 z-50 w-7 h-7 flex items-center justify-center
               bg-white border border-gray-200 rounded-full shadow hover:bg-gray-100"
            >
              <LuX size={16} />
            </button>

            <EmojiPicker
              onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || '');
                setIsOpen(false);
              }}
              height={350}
              width={300}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
