<template>
    <div
        class="md:col-span-1 col-span-full border border-gray-200 rounded-md flex justify-between bg-gradient-to-l from-indigo-50">
        <div class="md:p-20 p-5 w-1/2">
            <p class="traking-wider font-bold text-indigo-600 md:text-lg text-sm"> 
               <slot name="text"></slot>
            </p>
        </div>
        <div class="w-1/2">
            <slot name="image"></slot>
        </div>
    </div>
</template>