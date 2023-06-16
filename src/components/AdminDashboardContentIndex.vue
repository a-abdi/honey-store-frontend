<template>
    <div class="overflow-x-auto">
       <div class="flex justify-between w-full h-10 bg-violet-400">
           <div class="">
               <slot name="create"> </slot>
           </div>
           <div class="">
               <slot name="search"> </slot>
           </div>
       </div>
       <div class="overflow-x-auto">
           <router-view />
       </div>
    </div>
</template>