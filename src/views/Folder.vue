<template>
  <div>
    <h1></h1>
<!--    <div class="folder-breadcrumb" style="margin-top: 10px">-->
<!--      <Row>-->
<!--        <Col span="8" style="text-align: left;margin-left: 20px">-->
<!--          <span style="font-size: 20px">Select your local disk:&nbsp;&nbsp;</span>-->
<!--          <Select v-model="currentDisk" size="large" placeholder="Select"-->
<!--                  style="width: 60px">-->
<!--            <Option v-for="itemSelect in localDiskList" :value="itemSelect"-->
<!--                    :key="itemSelect" @click.native="localDiskChange">{{ itemSelect }}</Option>-->
<!--          </Select>-->
<!--        </Col>-->
<!--        <Col style="text-align: left;">-->
<!--          <Breadcrumb separator=">" style="font-size: medium;">-->
<!--            <BreadcrumbItem :key="index" :value="item" v-for="(item, index) in folderList">-->
<!--              <span type="text" @click="clickFolder(item)">{{ item.folderName }}</span>-->
<!--            </BreadcrumbItem>-->
<!--          </Breadcrumb>-->
<!--        </Col>-->
<!--      </Row>-->
<!--    </div>-->
    <div class="folder-breadcrumb">
      <Breadcrumb separator=">" style="font-size: medium;margin-top: 10px">
        <Button small type="dashed" icon="md-refresh" @click="refreshDisk"></Button>
        <span>&nbsp;&nbsp;</span>
        <BreadcrumbItem>
          <Select v-model="currentDisk" size="large" placeholder="Select"
                  style="width: 60px">
            <Option v-for="itemSelect in localDiskList" :value="itemSelect"
                    :key="itemSelect" @click.native="localDiskChange">{{ itemSelect }}</Option>
          </Select>
        </BreadcrumbItem>
        <BreadcrumbItem :key="index" :value="item" v-for="(item, index) in folderList">
          <span type="text" @click="clickFolder(item)">{{ item.folderName }}</span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="margin-bottom: 45px">
      <div style="margin: 10px 60px 20px 0;text-align: right">
        <Button type="primary" icon="md-add" @click="addFilesToConvey">Add</Button>
<!--        <span>&nbsp;&nbsp;<Icon type="md-arrow-forward" />&nbsp;&nbsp;</span>-->
<!--        <Button type="default" icon="md-book" to="/trans">Ready to Transfer</Button>-->
      </div>
      <Table
        :columns="filesTableColumns" border
        :data="filesTableDataShow" ref="selectFiles"
        class="files-table" no-data-text="Please Select local disk first"
        style="margin: 0 20px 10px 20px"
      ></Table>
      <div style="margin-top: 20px">
        <span>Total {{ filesTableDataShow.length }} items</span>
      </div>
<!--      <Page-->
<!--        :total="filesTableDataCount"-->
<!--        :page-size="filesTablePageSize"-->
<!--        @on-change="changeFilesTablePage"-->
<!--        @on-page-size-change="changeFilesTablePageSize"-->
<!--        show-total-->
<!--        show-sizer-->
<!--        show-elevator-->
<!--      ></Page>-->
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
            <Card style="width:350px">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                Selected Categories
              </p>
              <a href="#" slot="extra" @click.prevent="selectedTagsList = []">
                <Icon type="ios-loop-strong"></Icon>
                Clear
              </a>
              <ul>
                <li :key="index" :value="item" v-for="(item, index) in selectedTagsList">
                  <span>
                    <Icon type="ios-star" />
                    {{ item }}
                  </span>
                </li>
              </ul>
            </Card>
          </Row>
          <Row>
            <span :key="index" :value="item" v-for="(item, index) in tagsList" @click="addTag(index)">
              <Icon />{{ item }}
            </span>
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
