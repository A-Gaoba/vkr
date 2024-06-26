import{h as g,r as d,b as h,A as u,j as e,f as b}from"./index-10Jx05Y7.js";const r=({label:a,value:s})=>e.jsxs("p",{className:"mb-2 text-sm md:text-base capitalize",children:[e.jsxs("span",{className:"text-gray-700 font-bold",children:[a,":"]})," ",s??"N/A"]}),o=({label:a,value:s})=>e.jsxs("p",{className:"mb-2 md:text-base text-sm",children:[e.jsxs("span",{className:"font-bold",children:[a,":"]})," ",s??"N/A"]}),f=a=>a?new Date(a).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"N/A",p=()=>{const{id:a}=g(),[s,m]=d.useState(null),[x,c]=d.useState(!0),[n,i]=d.useState(null);return d.useEffect(()=>{a?h.get(`${u}/teachers/${a}`).then(l=>{const t=l.data;console.log("Fetched Teacher Data:",t),t.subjectsTaught=t.subjectsTaught||t.subjects||[],m(t),c(!1)}).catch(l=>{console.error(l),i("Failed to fetch teacher"),c(!1)}):(i("Invalid teacher ID"),c(!1))},[a]),x?e.jsx(b,{}):n?e.jsx("div",{className:"text-red-500",children:n}):s?e.jsx("div",{className:"md:p-6 bg-gray-100",children:e.jsxs("main",{className:"mx-auto bg-white p-8 rounded-lg shadow-lg",children:[e.jsx("h1",{className:"text-2xl md:text-3xl font-bold text-gray-800 mb-6",children:`${s.firstName} ${s.lastName}'s Profile`}),e.jsx("section",{className:"mb-8 bg-gray-50 p-6 rounded-md shadow-md",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[e.jsx("div",{className:"flex justify-center md:justify-start",children:e.jsx("img",{src:"../../../../../../../public/person-svgrepo-com.svg",alt:`${s.firstName} ${s.lastName}`,className:"w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover rounded-full border-2 border-gray-300"})}),e.jsx("div",{className:"col-span-1 md:col-span-2 lg:col-span-2",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(r,{label:"Full Name",value:`${s.firstName} ${s.lastName}`}),e.jsx(r,{label:"Date of Birth",value:f(s.dateOfBirth)}),e.jsx(r,{label:"Email",value:s.email}),e.jsx(r,{label:"Phone Number",value:s.phone}),e.jsx(r,{label:"Gender",value:s.gender})]})})]})}),e.jsxs("section",{className:"mb-8 bg-gray-50 p-6 rounded-md shadow-md",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-700 mb-4",children:"Professional Information"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(o,{label:"Subjects Taught",value:s.subjectsTaught.map(l=>e.jsx("span",{className:"inline-block bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full mr-2 mb-2",children:l.name},l.id))}),e.jsx(o,{label:"Years of Experience",value:e.jsx("span",{className:"inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full",children:s.yearsOfExperience})})]})]}),e.jsxs("section",{className:"mb-8 bg-gray-50 p-6 rounded-md shadow-md",children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-700 mb-4",children:"Additional Information"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:e.jsx(r,{label:"Bio",value:s.bio})})]})]})}):e.jsx("div",{className:"text-red-500",children:"Teacher not found"})};export{p as default};
