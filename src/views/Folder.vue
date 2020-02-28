<template>
  <div>
    <h1></h1>
    <div class="folder-breadcrumb">
      <Breadcrumb separator=">" style="font-size: medium">
        <BreadcrumbItem>
          <Select v-model="currentDisk" size="large" placeholder="Select"
                  style="width: 60px"
                  filterable=true @on-change="localDiskChange">
            <Option v-for="itemSelect in localDiskList" :value="itemSelect"
                    :key="itemSelect">{{ itemSelect }}</Option>
          </Select>
        </BreadcrumbItem>
        <BreadcrumbItem :key="index" :value="item" v-for="(item, index) in folderList">
          <span type="text" @click="clickFolder">{{ item.folderName }}</span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="margin-bottom: 45px">
      <Form ref="FilesForm" class="folder-files-form"
            :model="folderForm"
            :rules="folderFormRule"
            :label-width="380">
        <div style="margin: 10px 60px 20px 0;text-align: right">
          <Button type="primary" icon="md-book" @click="selectFiles">Add</Button>
        </div>
        <Table
          :columns="filesTableColumns"
          :data="filesTableDataShow"
          class="files-table"
          style="margin: 0 20px 10px 20px"
        ></Table>
        <Page
          :total="filesTableDataCount"
          :page-size="filesTablePageSize"
          @on-change="changeFilesTablePage"
          @on-page-size-change="changeFilesTablePageSize"
          show-total
          show-sizer
          show-elevator
        ></Page>
      </Form>
    </div>
    <div>
      <!--      <iframe src="" frameborder="0">Local file system.</iframe>-->
      <Modal v-model="addCategoriesDialog"
             draggable scrollable
             @on-ok="addCategoriesDialogOK"
      >
        <p slot="header" style="text-align:center">
          <Icon type="ios-book"></Icon>
          <span>Add Categories</span>
        </p>
        <div>
          <Row>
            <Col span="12">
            </Col>
            <Col span="12">
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script src="@/js/folder.js">

</script>

<style scoped>

</style>
