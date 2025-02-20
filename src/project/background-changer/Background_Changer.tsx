import React from 'react';
import { COLORS, ColorsRecord } from './colors';
import { useDispatch } from 'react-redux';
import { updateThemeColor } from '../../store/slice/project/themeSlice.ts';

// prop: { backgroundColor: COLORS} = { backgroundColor: COLORS.GREEN}
type buttonInfo = {
  name: string;
  color: COLORS;
};

const buttonInfoArray: buttonInfo[] = [
  { name: 'Yellow', color: COLORS.YELLOW },
  { name: 'RED', color: COLORS.RED },
  { name: 'GREEN', color: COLORS.GREEN },
  { name: 'BLUE', color: COLORS.BLUE },
  { name: 'BROWN', color: COLORS.BROWN },
  { name: 'BLACK', color: COLORS.BLACK }
];

const buttons = buttonInfoArray.map((buttonInfo) => (
  <button
    key={buttonInfo.name}
    className="text-white focus:ring-4 font-medium rounded-xl text-sm px-5 py-2.5"
    style={{ backgroundColor: buttonInfo.color }}
    value={buttonInfo.color}
  >
    {buttonInfo.name}
  </button>
));

export default function BackgroundChanger() {
  const dispatch = useDispatch();
  function changeColor(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;
    if (!target.value && !ColorsRecord.has(target.value)) return;
    dispatch(updateThemeColor(target.value!));
  }
  return (
    <>
      <div
        onClick={(event) => changeColor(event)}
        className="rounded-xl bg-white h-10 mb-16 pl-5 pr-5 p-6 flex justify-around items-center gap-10"
      >
        {buttons}
      </div>
    </>
  );
}
