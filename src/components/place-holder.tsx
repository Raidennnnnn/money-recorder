// import { useMemo, useState } from 'react';
// import * as Icon from './icon';
// import './place-holder.css';

// export default function PlaceHolder() {
//   const allIcons = useMemo(() => [...Object.values(Icon)], []);
//   const [displayedIcons, setDisplayedIcons] = useState(() => {
//     const shuffled = allIcons.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, 7);
//   });

//   const positions = useMemo(() => {
//     const generatedPositions: { top: number; left: number }[] = [];
//     const centerX = 40; // 中心X坐标
//     const centerY = 40; // 中心Y坐标

//     // 六边形布局
//     const layout = [
//       { row: 0, count: 2 },
//       { row: 1, count: 3 },
//       { row: 2, count: 2 }
//     ];

//     layout.forEach(({ row, count }) => {
//       const offset = Math.random() * 10 + 15;
//       const y = centerY + (row - 1) * offset;
//       for (let i = 0; i < count; i++) {
//         const offset = Math.random() * (30 - 20) + 20; // 每行之间的偏移量随机在15到30之间
//         const x = centerX + (i - (count - 1) / 2) * offset;
//         generatedPositions.push({ top: y, left: x });
//       }
//     });

//     return generatedPositions;
//   }, []);

//   const handleIconClick = (index: number) => {
//     const remainingIcons = allIcons.filter(icon => !displayedIcons.includes(icon));
//     if (remainingIcons.length > 0) {
//       const newIcon = remainingIcons[Math.floor(Math.random() * remainingIcons.length)];
//       setDisplayedIcons(prevIcons => {
//         const newIcons = [...prevIcons];
//         newIcons[index] = newIcon;
//         return newIcons;
//       });
//     }
//   };

//   return (
//     <>
//       {displayedIcons.map((IconComponent, index) => (
//         <IconComponent
//           key={index}
//           className="w-16 h-16 absolute animate-float"
//           style={{
//             top: `${positions[index].top}%`,
//             left: `${positions[index].left}%`,
//             animationDelay: `${Math.random() * 2}s`
//           }}
//           onClick={() => handleIconClick(index)}
//         />
//       ))}
//     </>
//   );
// }