import{h as $,u as E,r as t,j as e,Q as D,b as r,A as l,B as o}from"./index-10Jx05Y7.js";const R=()=>{const{id:n}=$(),g=E(),[a,b]=t.useState(null),[p,f]=t.useState([]),[y,N]=t.useState([]),[v,m]=t.useState(!0),[j,w]=t.useState(null),[S,u]=t.useState(!1),[C,h]=t.useState(!1);t.useEffect(()=>{(async()=>{m(!0);try{const[c,x,i]=await Promise.all([r.get(`${l}/subjects/${n}`),r.get(`${l}/classes`),r.get(`${l}/teachers`)]);b(c.data),f(x.data),N(i.data)}catch(c){console.error("Error fetching data:",c),w("Failed to fetch data")}finally{m(!1)}})()},[n]);const d=s=>{const{name:c,value:x}=s.target;b(i=>i?{...i,[c]:x}:null)},k=async()=>{if(a)try{await r.put(`${l}/subjects/${n}`,a),a.teacherId&&await r.post(`${l}/subjects/assign-teacher`,{subjectId:a.id,teacherId:parseInt(a.teacherId)}),o.success("Subject updated successfully")}catch(s){console.error("Error updating subject:",s),o.error("Failed to update subject")}u(!1)},I=async()=>{try{await r.delete(`${l}/subjects/${n}`),o.success("Subject deleted successfully"),g("/admin/subjects")}catch(s){console.error("Error deleting subject:",s),o.error("Failed to delete subject")}h(!1)};return v?e.jsx("div",{children:"Loading..."}):j?e.jsx("div",{className:"text-red-500",children:j}):a?e.jsxs("div",{className:"container mx-auto p-6 bg-white rounded-lg shadow-md",children:[e.jsx(D,{}),e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Edit Subject"}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700",children:"Name"}),e.jsx("input",{type:"text",placeholder:"Write subject name",name:"name",value:a.name,onChange:d,className:"w-full p-2 border border-gray-300 rounded"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700",children:"Description"}),e.jsx("textarea",{name:"description",value:a.description||"",onChange:d,placeholder:"Subject description",className:"w-full p-2 border border-gray-300 rounded"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700",children:"Class"}),e.jsxs("select",{name:"classId",title:"class id",value:a.classId||"",onChange:d,className:"w-full p-2 border border-gray-300 rounded",children:[e.jsx("option",{value:"",children:"Select a class"}),p.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700",children:"Teacher"}),e.jsxs("select",{name:"teacherId",title:"teacher id",value:a.teacherId||"",onChange:d,className:"w-full p-2 border border-gray-300 rounded",children:[e.jsx("option",{value:"",children:"Select a teacher"}),y.map(s=>e.jsx("option",{value:s.id,children:`${s.firstName} ${s.lastName}`},s.id))]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("button",{onClick:()=>u(!0),className:"px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600",children:"Save"}),e.jsx("button",{onClick:()=>h(!0),className:"px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700",children:"Delete"})]}),S&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[e.jsx("h2",{className:"text-xl mb-4",children:"Confirm Save"}),e.jsx("p",{className:"mb-4",children:"Are you sure you want to save the changes?"}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{onClick:k,className:"px-4 py-2 bg-dark-purple text-white rounded hover:bg-sky-600 mr-2",children:"Yes"}),e.jsx("button",{onClick:()=>u(!1),className:"px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400",children:"No"})]})]})}),C&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[e.jsx("h2",{className:"text-xl mb-4",children:"Confirm Delete"}),e.jsx("p",{className:"mb-4",children:"Are you sure you want to delete this subject?"}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{onClick:I,className:"px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2",children:"Yes"}),e.jsx("button",{onClick:()=>h(!1),className:"px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400",children:"No"})]})]})})]}):e.jsx("div",{className:"text-red-500",children:"Subject not found"})};export{R as default};