(()=>{var e={};e.id=308,e.ids=[308],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},3658:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>l}),r(135),r(3384),r(2874);var a=r(7105),o=r(5265),s=r(157),n=r.n(s),i=r(4665),d={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);r.d(t,d);let l=["",{children:["blog",{children:["[slug]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,135)),"C:\\Users\\Davi Dobbs\\OneDrive\\\xc1rea de Trabalho\\meu blog\\frontend\\app\\blog\\[slug]\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,3384)),"C:\\Users\\Davi Dobbs\\OneDrive\\\xc1rea de Trabalho\\meu blog\\frontend\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,2874,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\Davi Dobbs\\OneDrive\\\xc1rea de Trabalho\\meu blog\\frontend\\app\\blog\\[slug]\\page.tsx"],u="/blog/[slug]/page",m={require:r,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/blog/[slug]/page",pathname:"/blog/[slug]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},8131:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,696,23))},135:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x,generateStaticParams:()=>p});var a=r(5023),o=r(9737),s=r(7687),n=r(7111);let i=(0,r(4277).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var d=r(358),l=r(2054),c=r(7161),u=r(4960);let m={"agents-in-production":{title:"Como Implementar Agentes de IA em Produ\xe7\xe3o",date:"2024-03-15",readTime:"12 min",tags:["IA","Arquitetura","Produ\xe7\xe3o"],content:`
# Como Implementar Agentes de IA em Produ\xe7\xe3o

Implementar agentes de IA em produ\xe7\xe3o \xe9 um desafio que vai al\xe9m de simplesmente fazer o modelo funcionar. Requer arquitetura s\xf3lida, monitoramento robusto e estrat\xe9gias de fallback.

## Arquitetura Recomendada

A arquitetura de um sistema com agentes de IA deve considerar:

1. **Isolamento**: Cada agente deve rodar em um container isolado
2. **Queue System**: Use filas para gerenciar requisi\xe7\xf5es ass\xedncronas
3. **Circuit Breaker**: Implemente circuit breakers para proteger contra falhas em cascata
4. **Rate Limiting**: Controle a taxa de requisi\xe7\xf5es para evitar custos excessivos

## Monitoramento e Observabilidade

\xc9 essencial monitorar:

- Lat\xeancia de resposta
- Taxa de erro
- Custos por requisi\xe7\xe3o
- Qualidade das respostas (usando m\xe9tricas customizadas)

## Conclus\xe3o

Implementar agentes de IA em produ\xe7\xe3o requer planejamento cuidadoso e arquitetura robusta. O investimento em infraestrutura adequada paga dividendos em confiabilidade e escalabilidade.
    `},"cost-reduction-automation":{title:"Reduzindo Custos com Automa\xe7\xe3o Inteligente",date:"2024-03-10",readTime:"8 min",tags:["Automa\xe7\xe3o","Neg\xf3cios","IA"],content:`
# Reduzindo Custos com Automa\xe7\xe3o Inteligente

Neste estudo de caso, mostramos como reduzimos 60% dos custos operacionais de uma empresa usando LLMs e automa\xe7\xe3o de processos.

## O Problema

A empresa processava manualmente milhares de documentos por m\xeas, gerando custos altos com m\xe3o de obra e erros frequentes.

## A Solu\xe7\xe3o

Implementamos um sistema de processamento inteligente usando:

- LLMs para extra\xe7\xe3o de informa\xe7\xf5es
- Valida\xe7\xe3o autom\xe1tica de dados
- Integra\xe7\xe3o com sistemas existentes

## Resultados

- **60% de redu\xe7\xe3o** nos custos operacionais
- **95% de precis\xe3o** na extra\xe7\xe3o de dados
- **80% mais r\xe1pido** que o processo manual

## Conclus\xe3o

A automa\xe7\xe3o inteligente n\xe3o \xe9 apenas sobre tecnologia, mas sobre criar valor real para o neg\xf3cio.
    `},"ai-architecture":{title:"Arquitetura de Software para Sistemas com IA",date:"2024-03-05",readTime:"15 min",tags:["Arquitetura","IA","Engenharia"],content:`
# Arquitetura de Software para Sistemas com IA

Construir sistemas que integram IA requer decis\xf5es arquiteturais cuidadosas. Neste artigo, exploramos padr\xf5es e trade-offs.

## Padr\xf5es Arquiteturais

### 1. API Gateway Pattern
Centralize o acesso a m\xfaltiplos modelos de IA atrav\xe9s de um gateway \xfanico.

### 2. Adapter Pattern
Use adapters para abstrair diferentes provedores de IA (OpenAI, Anthropic, etc).

### 3. Strategy Pattern
Permita trocar estrat\xe9gias de IA sem modificar o c\xf3digo cliente.

## Trade-offs Importantes

- **Lat\xeancia vs Custo**: Modelos mais r\xe1pidos s\xe3o mais caros
- **Precis\xe3o vs Velocidade**: Modelos maiores s\xe3o mais precisos mas mais lentos
- **On-premise vs Cloud**: Controle vs Escalabilidade

## Conclus\xe3o

A arquitetura de sistemas com IA deve balancear performance, custo e manutenibilidade.
    `}};async function p(){return Object.keys(m).map(e=>({slug:e}))}function x({params:e}){let t=m[e.slug];return t||(0,o.notFound)(),(0,a.jsxs)(a.Fragment,{children:[a.jsx("section",{className:"bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16",children:(0,a.jsxs)("div",{className:"container-custom",children:[(0,a.jsxs)(c.z,{variant:"ghost",size:"sm",href:"/blog",className:"mb-8 text-white hover:bg-white/10",children:[a.jsx(i,{className:"mr-2",size:16}),"Voltar ao Blog"]}),(0,a.jsxs)("div",{className:"max-w-3xl",children:[a.jsx("div",{className:"flex flex-wrap gap-2 mb-6",children:t.tags.map(e=>a.jsx("span",{className:"px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full",children:e},e))}),a.jsx("h1",{className:"text-4xl md:text-5xl font-bold mb-6",children:t.title}),(0,a.jsxs)("div",{className:"flex items-center space-x-6 text-primary-100",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx(d.Z,{size:18}),a.jsx("span",{children:(0,u.p6)(t.date)})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx(l.Z,{size:18}),(0,a.jsxs)("span",{children:[t.readTime," de leitura"]})]})]})]})]})}),a.jsx(s.$,{children:a.jsx("div",{className:"max-w-4xl mx-auto",children:a.jsx(n.Z,{variant:"elevated",className:"p-8 md:p-12",children:a.jsx("article",{className:"prose prose-lg max-w-none",children:a.jsx("div",{className:"whitespace-pre-wrap",children:t.content})})})})})]})}},7161:(e,t,r)=>{"use strict";r.d(t,{z:()=>c});var a=r(5023),o=r(682),s=r(3779),n=r(8003);let i=e=>"href"in e,d=e=>{let{variant:t,size:r,className:a,children:o,...s}=e;return s},l=(e,t,r)=>(0,s.W)("inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",{primary:"bg-accent-500 text-primary-50 hover:bg-accent-400 focus:ring-accent-500/50 shadow-lg shadow-accent-500/20 hover:shadow-xl hover:shadow-accent-500/30 font-display font-semibold",secondary:"bg-neutral-800 text-neutral-200 hover:bg-neutral-700 focus:ring-neutral-600 border border-neutral-700",outline:"border-2 border-accent-500 text-accent-500 hover:bg-accent-500/10 focus:ring-accent-500/50 font-display",ghost:"text-accent-500 hover:bg-accent-500/10 focus:ring-accent-500/50"}[e],{sm:"px-4 py-2 text-sm",md:"px-6 py-3 text-base",lg:"px-8 py-4 text-lg"}[t],r),c=(0,n.forwardRef)((e,t)=>{let{variant:r="primary",size:s="md",className:n,children:c}=e,u=l(r,s,n);if(i(e)){let{href:r,...s}=d(e);return a.jsx(o.default,{href:r,className:u,ref:t,...s,children:c})}let m=d(e);return a.jsx("button",{ref:t,className:u,...m,children:c})});c.displayName="Button"},7111:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var a=r(5023),o=r(3779);function s({variant:e="default",hover:t=!1,className:r,children:s,...n}){return a.jsx("div",{className:(0,o.W)("rounded-xl transition-all duration-300",{default:"bg-primary-100/50 border border-neutral-800/50 backdrop-blur-sm",elevated:"bg-primary-100/60 border border-neutral-800/50 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 backdrop-blur-sm",outlined:"bg-transparent border-2 border-accent-500/30"}[e],t?"hover:scale-[1.02] hover:border-accent-500/50 hover:shadow-xl hover:shadow-accent-500/10 cursor-pointer transition-all duration-300":"",r),...n,children:s})}},7687:(e,t,r)=>{"use strict";r.d(t,{$:()=>s});var a=r(5023),o=r(3779);function s({children:e,title:t,subtitle:r,container:s=!0,className:n,...i}){return(0,a.jsxs)("section",{className:(0,o.W)("py-20 md:py-28 lg:py-32",n),...i,children:[s&&(0,a.jsxs)("div",{className:"container-custom",children:[(t||r)&&(0,a.jsxs)("div",{className:"text-center mb-16 md:mb-20 lg:mb-24",children:[t&&a.jsx("h2",{className:"text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-neutral-100 mb-5 md:mb-6 tracking-tight leading-tight",children:t}),r&&a.jsx("p",{className:"text-base md:text-lg lg:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed px-4",children:r})]}),e]}),!s&&e]})}},358:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(4277).Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]])},2054:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});let a=(0,r(4277).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},9737:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ReadonlyURLSearchParams:function(){return n},RedirectType:function(){return a.RedirectType},notFound:function(){return o.notFound},permanentRedirect:function(){return a.permanentRedirect},redirect:function(){return a.redirect}});let a=r(1167),o=r(4440);class s extends Error{constructor(){super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams")}}class n extends URLSearchParams{append(){throw new s}delete(){throw new s}set(){throw new s}sort(){throw new s}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4440:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{isNotFoundError:function(){return o},notFound:function(){return a}});let r="NEXT_NOT_FOUND";function a(){let e=Error(r);throw e.digest=r,e}function o(e){return"object"==typeof e&&null!==e&&"digest"in e&&e.digest===r}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6550:(e,t)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RedirectStatusCode",{enumerable:!0,get:function(){return r}}),function(e){e[e.SeeOther=303]="SeeOther",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect"}(r||(r={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1167:(e,t,r)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RedirectType:function(){return a},getRedirectError:function(){return d},getRedirectStatusCodeFromError:function(){return x},getRedirectTypeFromError:function(){return p},getURLFromRedirectError:function(){return m},isRedirectError:function(){return u},permanentRedirect:function(){return c},redirect:function(){return l}});let o=r(4580),s=r(2934),n=r(6550),i="NEXT_REDIRECT";function d(e,t,r){void 0===r&&(r=n.RedirectStatusCode.TemporaryRedirect);let a=Error(i);a.digest=i+";"+t+";"+e+";"+r+";";let s=o.requestAsyncStorage.getStore();return s&&(a.mutableCookies=s.mutableCookies),a}function l(e,t){void 0===t&&(t="replace");let r=s.actionAsyncStorage.getStore();throw d(e,t,(null==r?void 0:r.isAction)?n.RedirectStatusCode.SeeOther:n.RedirectStatusCode.TemporaryRedirect)}function c(e,t){void 0===t&&(t="replace");let r=s.actionAsyncStorage.getStore();throw d(e,t,(null==r?void 0:r.isAction)?n.RedirectStatusCode.SeeOther:n.RedirectStatusCode.PermanentRedirect)}function u(e){if("object"!=typeof e||null===e||!("digest"in e)||"string"!=typeof e.digest)return!1;let[t,r,a,o]=e.digest.split(";",4),s=Number(o);return t===i&&("replace"===r||"push"===r)&&"string"==typeof a&&!isNaN(s)&&s in n.RedirectStatusCode}function m(e){return u(e)?e.digest.split(";",3)[2]:null}function p(e){if(!u(e))throw Error("Not a redirect error");return e.digest.split(";",2)[1]}function x(e){if(!u(e))throw Error("Not a redirect error");return Number(e.digest.split(";",4)[3])}(function(e){e.push="push",e.replace="replace"})(a||(a={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[942,793,941],()=>r(3658));module.exports=a})();