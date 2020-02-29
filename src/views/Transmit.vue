<template>
  <div>
    <div style="margin-top: 45px; margin-bottom: 45px">
      <Form ref="TransForm" class="trans-form"
            :model="transForm"
            :rules="transFormRule"
            :label-width="380">
        <FormItem style="display:inline-block;" label="Select your Kindle device volume:  " >
          <Select v-model="transForm.volume" placeholder="Select" style="width: 80px" filterable=true>
            <Option v-for="item in volumeList" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </FormItem>
        <div style="margin: 10px 0 20px 0">
          <Button type="default" icon="md-folder" to="/folder">Select Files</Button>
        </div>
        <div style="margin: 10px 60px 20px 0;text-align: right">
          <Button type="primary" icon="md-book" @click="conveySelectedFiles">Convey</Button>
        </div>
        <Table
          :columns="transTableColumns"
          :data="transTableDataShow"
          class="files-table"
          style="margin: 0 20px 10px 20px"
        ></Table>
        <Page
          :total="transTableDataCount"
          :page-size="transTablePageSize"
          :page-size-opts="transTablePageSizeList"
          @on-change="changeTransTablePage"
          @on-page-size-change="changeTransTablePageSize"
          show-total
          show-sizer
          show-elevator
        ></Page>
      </Form>
    </div>
    <div>
<!--      <iframe src="" frameborder="0">Local file system.</iframe>-->
      <Modal v-model="selectFilesDialog"
             draggable scrollable
             @on-ok="selectFilesDialogOK"
      >
        <p slot="header" style="text-align:center">
          <Icon type="ios-book"></Icon>
          <span>Select eBooks</span>
        </p>
        <div>
          <Row>
            <Col span="12">
            </Col>
            <Col span="12">
            </Col>
            <div>
            </div>
          </Row>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script src="@/js/transmit.js">

</script>

<style scoped>
  .trans-form >>> .ivu-form-item-label{
    font-size: 22px;
    /*font-weight: bold;*/
  }
</style>
