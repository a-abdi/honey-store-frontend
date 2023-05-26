<template>
    <div class="min-w-min">
       <div class="flex justify-between w-full h-10 bg-violet-400">
           <div class="flex justify-items-center mr-4">
               <slot name="create"> </slot>
           </div>
           <div class="ml-4 flex text-white justify-items-center my-auto tracking-wider cursor-pointer">
               <slot name="search"> </slot>
           </div>
       </div>
       <div class="min-w-min">
           <router-view />
       </div>
    </div>
</template>