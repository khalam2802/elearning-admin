// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { UserService } from '../../services/UserService'

// export default function PageSearchUser() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   let searchValue=searchParams.get("q")
//   useEffect((searchValue) => { 
//     if (searchValue){

//       // console.log('searchParams: ', searchParams.get("q"));
      
//       UserService.getFilterUser(searchValue)
//       .then((res) => {
//         console.log('res: ', res);

//       })
//       .catch((err) => {
//         console.log(err);
//       });
      
//     }
//    },[searchParams])
//   return (
//     <div>
//       hi
//     </div>
//   )
// }
