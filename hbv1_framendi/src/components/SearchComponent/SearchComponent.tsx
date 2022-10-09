// import React, { useState, useEffect } from 'react';

// type Props = {};

// interface Location {
//     locationCode: String,
//     locationName: String
// }

// export const SearchComponent = (props: Props) => {
//     const [locations, setlocations] = useState<Location[] | []>([]);
//     const [location, setLocation] = useState<String | undefined>(undefined);
//     const [loading, setLoading] = useState<Boolean>(false);
//     const [noContent, setNoContent] = useState<Boolean>(false);

//   return (
//     <>
//       <select
//         onChange={(e) => setLocation(e.target.value)}
//         name="location"
//         id="location"
//       >
//         {locations.map((town: String, i: Number) => {
//           return (
//             <option key={`option-town-${i}`} value={town.toString()}>
//               {town}
//             </option>
//           );
//         })}
//       </select>
//     </>
//   );
// };

import React from 'react';

type Props = {};

const SearchComponent = (props: Props) => {
  return <div>SearchComponent</div>;
};
