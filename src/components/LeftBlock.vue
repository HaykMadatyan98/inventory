<template>
  <div class="left-block container">
    <img src="../assets/images/Blur.png" />
    <div class="skeletons">
      <div>
        <Skeleton height="26px" width="190px"></Skeleton>
      </div>
      <div>
        <Skeleton height="10px" width="155px"></Skeleton>
        <Skeleton height="10px" width="190px"></Skeleton>
        <Skeleton height="10px" width="170px"></Skeleton>
        <Skeleton height="10px" width="160px"></Skeleton>
        <Skeleton height="10px" width="140px"></Skeleton>
      </div>
      <div>
        <Skeleton height="10px" width="80px"></Skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "primevue/skeleton";
</script>
