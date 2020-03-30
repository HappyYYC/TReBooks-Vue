<template>
  <div>
    <br />
    <h1>E-Books Records</h1>
    <br />
    <div style="margin-bottom: 45px">
      <Table
        :columns="recordsTableColumns" border
        :data="recordsTableDataShow" ref="selectFiles"
        class="files-table" no-data-text="There is no record."
        style="margin: 0 20px 10px 20px"
      ></Table>
      <div style="margin-top: 20px">
        <span>Total {{ recordsTableDataShow.length }} items</span>
      </div>
    </div>
  </div>
</template>

<script src="@/js/record.js">

</script>

<style scoped>

</style>
