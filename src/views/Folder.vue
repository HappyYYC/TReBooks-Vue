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
        <Tooltip content="Refresh local Disks" placement="bottom">
          <Button small type="dashed" icon="md-refresh" @click="refreshDisk"></Button>
        </Tooltip>
        <span>&nbsp;&nbsp;</span>
        <BreadcrumbItem>
          <Select v-model="currentDisk" size="large" placeholder="Select"
                  style="width: 60px">
            <Option v-for="itemSelect in localDiskList"
                    :value="itemSelect" :label="itemSelect"
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
        <Button type="default" icon="ios-albums" @click="addCategoriesBatch">Batch</Button>
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
            <Card>
              <p slot="title">
                <Icon type="md-pricetags" />
                Selected Categories
              </p>
              <a href="#" slot="extra" @click.prevent="selectedTagsList = []">
                <Icon type="ios-loop-strong"></Icon>
                Clear
              </a>
              <Tag v-for="(item, index) in selectedTagsList" :key="index" :value="item" type="dot" closable color="success" @on-close="clickTagClose(index)">{{ item }}</Tag>
            </Card>
          </Row>
          <Row>
            <br />
            <br />
          </Row>
          <Row>
<!--            <span>-->
<!--              <Icon type="ios-pricetags-outline" />-->
<!--              {{ item }}-->
<!--            </span>-->
            <Button type="default" v-for="(item, index) in tagsList" :key="index" :value="item" @click="addTag(index)">
              <Icon type="ios-pricetags-outline" />
              {{ item }}
            </Button>
          </Row>
        </div>
      </Modal>
    </div>
    <div>
      <Modal v-model="addCategoriesBatchDialog"
             draggable scrollable
             @on-ok="addCategoriesBatchDialogOK"
      >
        <p slot="header" style="text-align:center">
          <Icon type="ios-book"></Icon>
          <span>Add Categories</span>
        </p>
        <div>
          <Row>
            <Card>
              <p slot="title">
                <Icon type="md-pricetags" />
                Selected Categories
              </p>
              <a href="#" slot="extra" @click.prevent="selectedTagsList = []">
                <Icon type="ios-loop-strong"></Icon>
                Clear
              </a>
              <Tag v-for="(item, index) in selectedTagsList" :key="index" :value="item" type="dot" closable color="success" @on-close="clickTagClose(index)">{{ item }}</Tag>
            </Card>
          </Row>
          <Row>
            <br />
            <br />
          </Row>
          <Row>
            <Button type="default" v-for="(item, index) in tagsList" :key="index" :value="item" @click="addTag(index)">
              <Icon type="ios-pricetags-outline" />
              {{ item }}
            </Button>
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
