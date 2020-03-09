<template>
  <div>
    <div style="margin-top: 15px; margin-bottom: 45px">
      <div style="margin: 5px 0 20px 0">
        <span style="font-size: larger">Select your Kindle device volume:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Select v-model="kindleVolume" placeholder="Select"
                style="width: 60px">
          <Option v-for="item in localDiskList" :value="item" :key="item">{{ item }}</Option>
        </Select>
        <span>&nbsp;&nbsp;</span>
        <Tooltip content="Refresh local Disks" placement="bottom">
          <Button small type="dashed" icon="md-refresh" @click="refreshDisk"></Button>
        </Tooltip>

        <!--        <span style="font-size: larger">&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--          <Icon type="md-arrow-round-forward" />&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--          Device name: , Free space: .-->
<!--        </span>-->
      </div>
      <div style="margin: 5px 0 5px 0">
        <Button type="default" icon="md-folder" to="/folder">Select Files</Button>
      </div>
      <div style="margin: 5px 60px 10px 0;text-align: right">
        <Button type="primary" icon="md-book" @click="conveySelectedFiles">Convey</Button>
      </div>
      <Table
        :columns="transTableColumns" border
        :data="transTableDataShow" ref="selectFiles"
        class="files-table" no-data-text="Please Select Files first"
        style="margin: 0 20px 10px 20px"
      ></Table>
      <div style="margin-top: 20px">
        <span>Total {{ transTableDataShow.length }} items</span>
      </div>
<!--      <Page-->
<!--        :total="transTableDataCount"-->
<!--        :page-size="transTablePageSize"-->
<!--        :page-size-opts="transTablePageSizeList"-->
<!--        @on-change="changeTransTablePage"-->
<!--        @on-page-size-change="changeTransTablePageSize"-->
<!--        show-total-->
<!--        show-sizer-->
<!--        show-elevator-->
<!--      ></Page>-->
    </div>
  </div>
</template>

<script src="@/js/transfer.js">

</script>

<style scoped>
  .trans-form >>> .ivu-form-item-label{
    font-size: 22px;
    /*font-weight: bold;*/
  }
</style>
