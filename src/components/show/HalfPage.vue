<template>
    <div
        class="sm:col-span-1 col-span-full py-2 border border-gray-200 rounded-md flex justify-between bg-gradient-to-l from-indigo-50">
        <div class="w-1/2 flex items-center px-2">
            <p class="tracking-wider font-bold text-indigo-600 xl:text-xl lg:text-lg md:text-normal sm:text-sm text-xs"> گرده
                <slot name="text"></slot>
            </p>
        </div>
        <div class="w-1/2 flex items-center">
            <slot name="image"></slot>
        </div>
    </div>
</template>